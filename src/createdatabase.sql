drop table if exists book, bookcategory, category, invoice, ownedbook, report, sellingbook, transac, useraccount, shopping_cart cascade;

create table USERACCOUNT (
	Username varchar(50),
	Email varchar(50) unique,
	Pass varchar(50),
	States boolean,
	Balance float,
	FullName varchar(100),
	PhoneNumber char(30),
	Birth timestamp (0) with time zone,
	constraint PK_USERACCOUNT primary key (Username)
);

create table BOOK (
	ID_Book serial,
	NameBook varchar(100),
	Author varchar(100),
	Price float,
	Description varchar(2000),
	PublishedYear timestamp (0) with time zone,
	constraint PK_BOOK primary key (ID_Book)
);

create table INVOICE (
	ID_Invoice serial,
	IUsername varchar(50),
	DateInvoice timestamp (0) with time zone,
	Total float,
	IType boolean,
	constraint PK_INVOICE primary key (ID_Invoice)
);

create table TRANSAC (
	ID_Transac int,
	ID_Sender varchar(50),
	TBook int,
	constraint PK_TRANSAC primary key (ID_Transac)
);

create table OWNEDBOOK (
	OUsername varchar(50),
	OBook int,
	constraint PK_OWNEDBOOK primary key (OUsername, OBook)
);

create table SELLINGBOOK (
	SUsername varchar(50),
	SBook int,
	constraint PK_SELLINGBOOK primary key (SUsername, SBook)
);

create table REPORT (
	ID_Report serial,
	RUsername varchar(50),
	ReportedUser varchar(50),
	RBook int,
	constraint PK_REPORT primary key (ID_Report)
);

create table CATEGORY (
	ID_Category varchar(50),
	NameCategory varchar(100),
	constraint PK_CATEGORY primary key (ID_Category)
);

create table BOOKCATEGORY (
	BCBook int,
	BCCategory varchar(50),
	constraint PK_BOOKCATEGORY primary key (BCBook, BCCategory)
);

create table SHOPPING_CART (
	ShopUser varchar(50),
	ShopBook int,
	Quantity int,
	Item_Total float,
	constraint PK_SHOPPING_CART primary key (ShopUser, ShopBook)
);

set TIMEZONE = 'Asia/Saigon';
set DateStyle = 'DMY';

alter table OWNEDBOOK add constraint FK_OWNEDBOOK_USERACCOUNT foreign key (OUsername) references USERACCOUNT(Username);
alter table OWNEDBOOK add constraint FK_OWNEDBOOK_BOOK foreign key (OBook) references BOOK(ID_Book);

alter table SELLINGBOOK add constraint FK_SELLINGBOOK_USERACCCOUNT foreign key (SUsername) references USERACCOUNT(Username);
alter table SELLINGBOOK add constraint FK_SELLINGBOOK_BOOK foreign key (SBook) references BOOK(ID_Book);

alter table BOOKCATEGORY add constraint FK_BOOKCATEGORY_BOOK foreign key (BCBook) references BOOK(ID_Book);
alter table BOOKCATEGORY add constraint FK_BOOKCATEGORY_CATEGORY foreign key (BCCategory) references CATEGORY(ID_Category);

alter table REPORT add constraint FK_REPORT_USERACCOUNT foreign key (RUsername) references USERACCOUNT(Username);
alter table REPORT add constraint FK_REPORT_SELLINGBOOK foreign key (ReportedUser, RBook) references SELLINGBOOK(SUsername, SBook);

alter table INVOICE add constraint FK_INVOICE_USERACCOUNT foreign key (IUsername) references USERACCOUNT(Username);

alter table TRANSAC add constraint FK_TRANSAC_INVOICE foreign key (ID_Transac) references INVOICE(ID_Invoice);
alter table TRANSAC add constraint FK_TRANSAC_SELLINGBOOK foreign key (ID_Sender, TBook) references SELLINGBOOK(SUsername, SBook);

alter table SHOPPING_CART add constraint FK_SHOPPING_CART_USERACCOUNT foreign key (ShopUser) references USERACCOUNT(Username);
alter table SHOPPING_CART add constraint FK_SHOPPING_CART_BOOK foreign key (ShopBook) references BOOK(ID_Book);

-- Create a trigger function
CREATE OR REPLACE FUNCTION shopping_cart_trigger()
RETURNS TRIGGER AS $$
DECLARE
  book_price FLOAT;
BEGIN
  -- Get the price of the related book from the BOOK table
  SELECT Price INTO book_price FROM BOOK WHERE ID_Book = NEW.ShopBook;
  -- If the trigger is fired by an insert operation
  IF TG_OP = 'INSERT' THEN
    -- Set the Quantity to 1 and the Item_Total to the book price
    NEW.Quantity := 1;
    NEW.Item_Total := book_price;
    -- Return the new row to the trigger
    RETURN NEW;
  -- If the trigger is fired by an update operation
  ELSIF TG_OP = 'UPDATE' THEN
    -- Check if the new Quantity is greater than or equal to 1
    IF NEW.Quantity >= 1 THEN
      -- Update the Item_Total to the product of the Quantity and the book price
      NEW.Item_Total := NEW.Quantity * book_price;
      -- Return the new row to the trigger
      RETURN NEW;
    ELSE
      -- Raise an exception and abort the update
      RAISE EXCEPTION 'Quantity must be greater than or equal to 1';
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql;


-- Create a trigger
CREATE TRIGGER shopping_cart_trigger
BEFORE INSERT OR UPDATE ON SHOPPING_CART
FOR EACH ROW
EXECUTE PROCEDURE shopping_cart_trigger();

alter table SHOPPING_CART enable trigger shopping_cart_trigger;