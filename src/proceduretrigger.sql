-- Cập nhật giá của món hàng trong giỏ hàng khi giá món hàng thay đổi
CREATE OR REPLACE FUNCTION update_item_price_trigger()
RETURNS TRIGGER AS $$
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
CREATE TRIGGER update_item_price_trigger
AFTER UPDATE ON SELLINGBOOK
FOR EACH ROW
EXECUTE PROCEDURE update_item_price_trigger();


-- Đảm bảo giá món hàng trong giỏ hàng = giá của món hàng 
-- Create a trigger function
CREATE OR REPLACE FUNCTION shopping_cart_trigger()
RETURNS TRIGGER AS $$
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
BEFORE INSERT ON SHOPPING_CART
FOR EACH ROW
EXECUTE PROCEDURE shopping_cart_trigger();

-- Khi tài khoản bị ban thì chỉ xóa hết mọi thao tác bán 
CREATE OR REPLACE FUNCTION del_banneduser_sell_trigger()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the trigger is fired by an update operation on the user account table
  IF TG_OP = 'UPDATE' THEN
    -- Check if the state in the user account table has changed
    IF NEW.States <> OLD.States AND NEW.States = false THEN
      -- Delete all the selling actions of the banned user from the selling book table
      DELETE FROM SELLINGBOOK WHERE SUsername = OLD.Username;
    END IF;
    -- Return the new row to the trigger
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger
CREATE TRIGGER del_banneduser_sell_trigger
AFTER UPDATE ON USERACCOUNT
FOR EACH ROW
EXECUTE PROCEDURE del_banneduser_sell_trigger();


-- Kích hoạt / áp dụng trigger
-- Enable trigger
alter table SHOPPING_CART enable trigger shopping_cart_trigger;
alter table SELLINGBOOK enable trigger update_item_price_trigger;
alter table USERACCOUNT enable trigger del_banneduser_sell_trigger;