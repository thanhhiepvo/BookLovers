--USERACCOUNT data--
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
insert into USERACCOUNT (Username, Email, Pass, States, Balance, Fullname, PhoneNumber, Birth) values ('admin', 'booklovers.reply@gmail.com', 'admin', 'true', 1000000000, 'ADMIN', NULL, NULL);
insert into USERACCOUNT (Username, Email, Pass, States, Balance, Fullname, PhoneNumber, Birth) values ('blanker321', 'tangphong333@gmail.com', 'ducphong1293', 'true', 10000000, 'Tăng Đức Phong', '0931406059', '2003-09-12');
insert into USERACCOUNT (Username, Email, Pass, States, Balance, Fullname, PhoneNumber, Birth) values ('user1', 'user1@gmail.com', 'passuser1', 'true', 0, NULL, NULL, NULL);
insert into USERACCOUNT (Username, Email, Pass, States, Balance, Fullname, PhoneNumber, Birth) values ('user2', 'user2@yahoo.com', 'passuser2', 'true', 10, NULL, NULL, NULL);
insert into USERACCOUNT (Username, Email, Pass, States, Balance, Fullname, PhoneNumber, Birth) values ('user3', 'user3@outlook.com', 'passuser3', 'true', 100, NULL, NULL, NULL);
insert into USERACCOUNT (Username, Email, Pass, States, Balance, Fullname, PhoneNumber, Birth) values ('user4', 'user4@yahoo.com', 'passuser4', 'true', 20, NULL, NULL, NULL);
insert into USERACCOUNT (Username, Email, Pass, States, Balance, Fullname, PhoneNumber, Birth) values ('user5', 'user5@gmail.com', 'passuser5', 'true', 15, NULL, NULL, NULL);
insert into USERACCOUNT (Username, Email, Pass, States, Balance, Fullname, PhoneNumber, Birth) values ('user6', 'user6@gmail.com', 'passuser6', 'true', 36.9, NULL, NULL, NULL);
insert into USERACCOUNT (Username, Email, Pass, States, Balance, Fullname, PhoneNumber, Birth) values ('user7', 'user7@outlook.com', 'passuser7', 'true', 69, NULL, NULL, NULL);
insert into USERACCOUNT (Username, Email, Pass, States, Balance, Fullname, PhoneNumber, Birth) values ('user8', 'user8@outlook.com', 'passuser8', 'true', 80, NULL, NULL, NULL);
insert into USERACCOUNT (Username, Email, Pass, States, Balance, Fullname, PhoneNumber, Birth) values ('user9', 'user9@yahoo.com', 'passuser9', 'true', 75.6, NULL, NULL, NULL);
insert into USERACCOUNT (Username, Email, Pass, States, Balance, Fullname, PhoneNumber, Birth) values ('user10', 'user10@outlook.com', 'passuser10', 'false',89.4, NULL, NULL, NULL);

--BOOK data--
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
insert into BOOK (NameBook, Author, Description, PublishedYear) values ('Python for Data Analysis, 1st Edition', 'Wes McKinney', NULL, '2012-11-13');
insert into BOOK (NameBook, Author, Description, PublishedYear) values ('Python Crash Course, 3rd Edition: A Hands-On, Project-Based Introduction to Programming', 'Eric Matthes', NULL, '2023-01-10');
insert into BOOK (NameBook, Author, Description, PublishedYear) values ('JavaScript for Absolute Beginners, 1st Edition', 'Terry McNavage', NULL, '2010-12-29');
insert into BOOK (NameBook, Author, Description, PublishedYear) values ('Starting Out with C++ from Control Structures to Objects, 9th Edition', 'Tony Gaddis', NULL, '2017-02-13');
insert into BOOK (NameBook, Author, Description, PublishedYear) values ('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', NULL, '2015-02-10');
insert into BOOK (NameBook, Author, Description, PublishedYear) values ('Computer Networking: A Top-Down Approach, 7th Edition', 'James Kurose & Keith Ross', NULL, '2016-04-26');
insert into BOOK (NameBook, Author, Description, PublishedYear) values ('Guinness World Records 2024', 'Guinness World Records', NULL, '2023-09-12');
insert into BOOK (NameBook, Author, Description, PublishedYear) values ('Harry Potter and the Goblet of Fire, Book 4', 'J. K. Rowling', NULL, '2002-09-01');
insert into BOOK (NameBook, Author, Description, PublishedYear) values ('The Ballad of Songbirds and Snakes (A Hunger Games Novel) (The Hunger Games)', 'Suzanne Collins', NULL, '2020-05-19');
insert into BOOK (NameBook, Author, Description, PublishedYear) values ('The Silence of the Lambs (Hannibal Lecter), 25th Anniversary', 'Thomas Harris', NULL, '2013-10-01');

--CATEGORY data--
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
insert into CATEGORY (ID_Category, NameCategory) values ('C1', 'Fiction');
insert into CATEGORY (ID_Category, NameCategory) values ('C2', 'Non-fiction');
insert into CATEGORY (ID_Category, NameCategory) values ('C3', 'Horror');
insert into CATEGORY (ID_Category, NameCategory) values ('C4', 'Thriller');
insert into CATEGORY (ID_Category, NameCategory) values ('C5', 'Fantasy');
insert into CATEGORY (ID_Category, NameCategory) values ('C6', 'Drama');
insert into CATEGORY (ID_Category, NameCategory) values ('C7', 'Action');
insert into CATEGORY (ID_Category, NameCategory) values ('C8', 'Adventure');
insert into CATEGORY (ID_Category, NameCategory) values ('C9', 'Technology');
insert into CATEGORY (ID_Category, NameCategory) values ('C10', 'Reference');
insert into CATEGORY (ID_Category, NameCategory) values ('C11', 'Novel');
insert into CATEGORY (ID_Category, NameCategory) values ('C12', 'Computer');
insert into CATEGORY (ID_Category, NameCategory) values ('C13', 'History');
insert into CATEGORY (ID_Category, NameCategory) values ('C14', 'Self-help');
insert into CATEGORY (ID_Category, NameCategory) values ('C15', 'Comic');


--OWNEDBOOK data--
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
insert into OWNEDBOOK (OUsername, OBook) values ('blanker321', 1);
insert into OWNEDBOOK (OUsername, OBook) values ('blanker321', 2);
insert into OWNEDBOOK (OUsername, OBook) values ('blanker321', 3);
insert into OWNEDBOOK (OUsername, OBook) values ('blanker321', 4);
insert into OWNEDBOOK (OUsername, OBook) values ('user1', 2);
insert into OWNEDBOOK (OUsername, OBook) values ('user2', 3);
insert into OWNEDBOOK (OUsername, OBook) values ('user3', 4);
insert into OWNEDBOOK (OUsername, OBook) values ('user4', 5);
insert into OWNEDBOOK (OUsername, OBook) values ('user5', 6);
insert into OWNEDBOOK (OUsername, OBook) values ('user6', 7);

--SELLINGBOOK data--
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
insert into SELLINGBOOK (SUsername, Sbook, SPrice) values ('blanker321', 1, 848288);
insert into SELLINGBOOK (SUsername, Sbook, SPrice) values ('blanker321', 2, 800000);
insert into SELLINGBOOK (SUsername, Sbook, SPrice) values ('blanker321', 3, 90000);
insert into SELLINGBOOK (SUsername, Sbook, SPrice) values ('user1', 2, 774988);
insert into SELLINGBOOK (SUsername, Sbook, SPrice) values ('user3', 2, 784988);
insert into SELLINGBOOK (SUsername, Sbook, SPrice) values ('user5', 2, 794988);
insert into SELLINGBOOK (SUsername, Sbook, SPrice) values ('user9', 2, 754988);
insert into SELLINGBOOK (SUsername, Sbook, SPrice) values ('user2', 3, 955811);
insert into SELLINGBOOK (SUsername, Sbook, SPrice) values ('user3', 4, 355674);
insert into SELLINGBOOK (SUsername, Sbook, SPrice) values ('user4', 5, 521594);
insert into SELLINGBOOK (SUsername, Sbook, SPrice) values ('user5', 6, 195385);
insert into SELLINGBOOK (SUsername, Sbook, SPrice) values ('user6', 7, 381790);
insert into SELLINGBOOK (SUsername, Sbook, SPrice) values ('user7', 8, 268200);
insert into SELLINGBOOK (SUsername, Sbook, SPrice) values ('user8', 9, 533730);
insert into SELLINGBOOK (SUsername, Sbook, SPrice) values ('user9', 10, 266743);

--INVOICE data--
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
insert into INVOICE (IUsername, DateInvoice, Total, IType) values ('blanker321', '2023-12-16', 1000000, 'false');
insert into INVOICE (IUsername, DateInvoice, Total, IType) values ('blanker321', '2023-12-16', 1000000, 'true');

--TRANSAC data--
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
insert into TRANSAC (ID_Transac, ID_Sender, TBook) values (2, 'user1', 2);

--REPORT data--
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
insert into REPORT (RUsername, ReportedUser, RBook, Reason) values ('blanker321', 'user1', 2, 'Cuốn sách này đã thổi bay giấc mộng đại học của tôi');
insert into REPORT (RUsername, ReportedUser, RBook, Reason) values ('blanker321', 'user5', 6, 'Ghét thằng user5');
insert into REPORT (RUsername, ReportedUser, RBook, Reason) values ('blanker321', 'user9', 10, 'Bị ép phải điền lý do');

--BOOKCATEGORY data--
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
insert into BOOKCATEGORY (BCBook, BCCategory) values (1, 'C2');
insert into BOOKCATEGORY (BCBook, BCCategory) values (1, 'C9');
insert into BOOKCATEGORY (BCBook, BCCategory) values (1, 'C12');
insert into BOOKCATEGORY (BCBook, BCCategory) values (8, 'C5');
insert into BOOKCATEGORY (BCBook, BCCategory) values (8, 'C7');
insert into BOOKCATEGORY (BCBook, BCCategory) values (8, 'C8');
insert into BOOKCATEGORY (BCBook, BCCategory) values (8, 'C1');
insert into BOOKCATEGORY (BCBook, BCCategory) values (8, 'C11');
insert into BOOKCATEGORY (BCBook, BCCategory) values (10, 'C3');
insert into BOOKCATEGORY (BCBook, BCCategory) values (10, 'C4');
insert into BOOKCATEGORY (BCBook, BCCategory) values (9, 'C6');
insert into BOOKCATEGORY (BCBook, BCCategory) values (9, 'C7');
insert into BOOKCATEGORY (BCBook, BCCategory) values (9, 'C8');
