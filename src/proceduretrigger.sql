-- Cập nhật giá của món hàng trong giỏ hàng khi giá món hàng thay đổi

CREATE OR REPLACE FUNCTION update_item_price_trigger() RETURNS TRIGGER AS $$
BEGIN
  -- Check if the trigger is fired by an update operation on the book table
  IF TG_OP = 'UPDATE' THEN
    -- Check if the price in the book table has changed
    IF NEW.SPrice <> OLD.SPrice THEN
      -- Update the item price in the shopping cart table for all the rows that match the updated book id
      UPDATE SHOPPING_CART SET Selling_Price = NEW.SPrice WHERE ShopBook = NEW.SBook AND ShopSeller = NEW.SUsername;
    END IF;
    -- Return the new row to the trigger
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger

CREATE TRIGGER update_item_price_trigger AFTER
UPDATE ON SELLINGBOOK
FOR EACH ROW EXECUTE PROCEDURE update_item_price_trigger();

-- Đảm bảo giá món hàng trong giỏ hàng = giá của món hàng
-- Create a trigger function

CREATE OR REPLACE FUNCTION shopping_cart_trigger() RETURNS TRIGGER AS $$
DECLARE
  book_price FLOAT;
BEGIN
  -- Get the price of the related book from the SELLINGBOOK table
  SELECT SPrice INTO book_price FROM SELLINGBOOK WHERE SBook = NEW.ShopBook AND SUsername = NEW.ShopSeller;
  -- If the trigger is fired by an insert operation
  IF TG_OP = 'INSERT' THEN
    -- Item_Total to the book price
    NEW.Selling_Price := book_price;
    -- Return the new row to the trigger
    RETURN NEW;
  ELSE
	RETURN NULL;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger

CREATE TRIGGER shopping_cart_trigger
BEFORE
INSERT ON SHOPPING_CART
FOR EACH ROW EXECUTE PROCEDURE shopping_cart_trigger();

-- Khi tài khoản bị ban thì chỉ xóa hết mọi thao tác bán và các report đến tài khoản bị ban

CREATE OR REPLACE FUNCTION del_banneduser_sell_trigger() RETURNS TRIGGER AS $$
BEGIN
  -- Check if the trigger is fired by an update operation on the user account table
  IF TG_OP = 'UPDATE' THEN
    -- Check if the state in the user account table has changed
    IF NEW.States <> OLD.States AND NEW.States = false THEN
      -- Delete all the selling actions of the banned user from the selling book table
      DELETE FROM REPORT WHERE ReportedUser = OLD.Username;
      DELETE FROM SHOPPING_CART WHERE ShopSeller = OLD.Username;
	  DELETE FROM INVOICE WHERE ID_Invoice in (
	  	SELECT ID_Transac FROM TRANSAC WHERE ID_Sender = OLD.Username
	  );
	  DELETE FROM SELLINGBOOK WHERE SUsername = OLD.Username;
    END IF;
    -- Return the new row to the trigger
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger

CREATE TRIGGER del_banneduser_sell_trigger AFTER
UPDATE ON USERACCOUNT
FOR EACH ROW EXECUTE PROCEDURE del_banneduser_sell_trigger();

-- Kích hoạt / áp dụng trigger
-- Enable trigger
alter table SHOPPING_CART enable trigger shopping_cart_trigger;
alter table SELLINGBOOK enable trigger update_item_price_trigger;
alter table USERACCOUNT enable trigger del_banneduser_sell_trigger;

-----------------------------------------------------------------------------
-- procedure tính tổng tiền giỏ hàng

CREATE OR REPLACE PROCEDURE total_shopping_price ( IN username varchar(50), OUT total_amount float) LANGUAGE plpgsql AS $$
BEGIN
  -- Calculate the total amount
  SELECT COALESCE(SUM(Selling_Price), 0) INTO total_amount
  FROM SHOPPING_CART
  WHERE ShopUser = username;
END;
$$;

-----------------------------------------------------------------------------
-- procedure thanh toán trên giỏ hàng

CREATE OR REPLACE PROCEDURE Payment ( IN v_username varchar(50), IN v_price float, OUT v_state boolean) LANGUAGE plpgsql AS $$
DECLARE
    userbalance float;
	tempid int;
	temp_row record;
BEGIN
    SELECT Balance INTO userbalance
    FROM USERACCOUNT
    WHERE Username = v_username;

    IF userbalance < -v_price THEN
        v_state := 'false';
    ELSE
        BEGIN
			-- cộng trừ tiền người mua
            UPDATE USERACCOUNT SET Balance = Balance + v_price
            WHERE Username = v_username;
			-- thêm vào sách đã mua
			INSERT INTO OWNEDBOOK
			SELECT ShopUser, ShopBook
			FROM SHOPPING_CART
			WHERE ShopUser = v_username;
			-- lưu lịch sử giao dịch mua bán
			-- Vòng lặp từng dòng trong bảng tạm
			FOR temp_row IN (
				SELECT ShopSeller, Selling_Price, ShopBook
				FROM SHOPPING_CART
				WHERE ShopUser = v_username
			) LOOP
				-- cộng trừ tiền người bán
				UPDATE USERACCOUNT SET Balance = Balance + temp_row.Selling_Price
            	WHERE Username = temp_row.ShopSeller;
				
				-- INSERT vào bảng INVOICE và trả về ID_Invoice mới vừa INSERT
				INSERT INTO INVOICE (IUsername, DateInvoice, Total, IType) 
				VALUES (v_username, NOW(), -temp_row.Selling_Price, 'true')
				RETURNING ID_Invoice INTO tempid;

				-- INSERT vào bảng TRANSAC
				INSERT INTO TRANSAC (ID_Transac, ID_Sender, TBook)
				VALUES (tempid, temp_row.ShopSeller, temp_row.ShopBook);
			END LOOP;
			-- xóa khỏi giỏ hàng
			DELETE FROM SHOPPING_CART
			WHERE ShopUser = v_username;
			v_state := 'true';
        EXCEPTION WHEN OTHERS THEN
			v_state := 'false';
        END;
    END IF;
END;
$$;

-----------------------------------------------------------------------------
-- procedure thanh toán 1 sản phẩm

CREATE OR REPLACE PROCEDURE BuyOneBook ( IN v_username varchar(50), IN v_seller varchar(50), IN v_bookid int, IN v_price float, OUT V_STATE int) LANGUAGE plpgsql AS $$
DECLARE
    userbalance float;
	tempid int;
BEGIN
	IF EXISTS(SELECT 1 FROM OWNEDBOOK WHERE OUsername = v_username AND OBook = v_bookid) THEN
		v_state := -1;
	ELSE
		SELECT Balance INTO userbalance
		FROM USERACCOUNT
		WHERE Username = v_username;

		IF userbalance < -v_price THEN
			v_state := 1;
		ELSE
			BEGIN
				-- cộng trừ tiền mua người mua và người bán
				UPDATE USERACCOUNT SET Balance = Balance + v_price
				WHERE Username = v_username;
				UPDATE USERACCOUNT SET Balance = Balance - v_price
				WHERE Username = v_seller;
				-- thêm vào sách đã mua
				INSERT INTO OWNEDBOOK (OUsername, OBook) VALUES (v_username, v_bookid);

				-- lưu lịch sử giao dịch người mua
				INSERT INTO INVOICE (IUsername, DateInvoice, Total, IType) VALUES (v_username, NOW(), v_price, 'true')
				RETURNING ID_Invoice INTO tempid;
				INSERT INTO TRANSAC (ID_Transac, ID_Sender, TBook) VALUES (tempid, v_seller, v_bookid);

				v_state := 0;
			EXCEPTION WHEN OTHERS THEN
				v_state := 1;
			END;
		END IF;
	END IF;
END;
$$;