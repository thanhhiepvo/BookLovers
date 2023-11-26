create table USERACCOUNT (
	Username varchar(50),
	Email varchar(50),
	Pass varchar(50),
	States bit,
	Balance float,
	Fullname varchar(100),
	PhoneNumber char(10),
	Birth timestamp (0) with time zone,
	constraint PK_USERACCOUNT primary key (Username)
);

create table BOOK (
	ID_Book serial,
	NameBook varchar(100),
	Author varchar(100),
	Price float,
	Description varchar(2000),
	PublisedYear timestamp (0) with time zone,
	constraint PK_BOOK primary key (ID_Book)
);

create table INVOICE (
	ID_Invoice serial,
	IUsername varchar(50),
	DateInvoice timestamp (0) with time zone,
	Total float,
	IType bit,
	constraint PK_INVOICE primary key (ID_Invoice)
);

create table TRANSAC (
	ID_Transac int,
	ID_Sender varchar(50),
	TBook int,
	constraint PK_TRANSAC primary key (ID_Transac)
);

create table DEPOSITE_WITHDRAW (
	ID_DW int,
	DWUsername varchar(50),
	constraint PK_DEPOSITE_WITHDRAW primary key (ID_DW)
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

alter table DEPOSITE_WITHDRAW add constraint FK_DEPOSITE_WITHDRAW_INVOICE foreign key (ID_DW) references INVOICE(ID_Invoice);