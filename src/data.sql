--USERACCOUNT data--
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
insert into USERACCOUNT (Username, Email, Pass, States, Balance, Fullname, PhoneNumber, Birth) values ('user10', 'user10@outlook.com', 'passuser10', 'true',89.4, NULL, NULL, NULL);

--BOOK data--
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
insert into BOOK (NameBook, Author, Price, Description, PublishedYear) values ('Python for Data Analysis, 1st Edition', 'Wes McKinney', 848288, NULL, '2012-11-13');
insert into BOOK (NameBook, Author, Price, Description, PublishedYear) values ('Python Crash Course, 3rd Edition: A Hands-On, Project-Based Introduction to Programming', 'Eric Matthes', 774988, NULL, '2023-01-10');
insert into BOOK (NameBook, Author, Price, Description, PublishedYear) values ('JavaScript for Absolute Beginners, 1st Edition', 'Terry McNavage', 955811, NULL, '2010-12-29');
insert into BOOK (NameBook, Author, Price, Description, PublishedYear) values ('Starting Out with C++ from Control Structures to Objects, 9th Edition', 'Tony Gaddis', 355674, NULL, '2017-02-13');
insert into BOOK (NameBook, Author, Price, Description, PublishedYear) values ('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 521594, NULL, '2015-02-10');
insert into BOOK (NameBook, Author, Price, Description, PublishedYear) values ('Computer Networking: A Top-Down Approach, 7th Edition', 'James Kurose & Keith Ross', 195385, NULL, '2016-04-26');
insert into BOOK (NameBook, Author, Price, Description, PublishedYear) values ('Guinness World Records 2024', 'Guinness World Records', 381790, NULL, '2023-09-12');
insert into BOOK (NameBook, Author, Price, Description, PublishedYear) values ('Harry Potter and the Goblet of Fire, Book 4', 'J. K. Rowling', 268200, NULL, '2002-09-01');
insert into BOOK (NameBook, Author, Price, Description, PublishedYear) values ('The Ballad of Songbirds and Snakes (A Hunger Games Novel) (The Hunger Games)', 'Suzanne Collins', 533730, NULL, '2020-05-19');
insert into BOOK (NameBook, Author, Price, Description, PublishedYear) values ('The Silence of the Lambs (Hannibal Lecter), 25th Anniversary', 'Thomas Harris', 266743, NULL, '2013-10-01');

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
-- insert into OWNEDBOOK (OUsername, OBook) values ('C1', 'Fiction');
-- insert into OWNEDBOOK (OUsername, OBook) values ('C2', 'Non-fiction');
-- insert into OWNEDBOOK (OUsername, OBook) values ('C3', 'Horror');
-- insert into OWNEDBOOK (OUsername, OBook) values ('C4', 'Thriller');
-- insert into OWNEDBOOK (OUsername, OBook) values ('C5', 'Fantasy');
-- insert into OWNEDBOOK (OUsername, OBook) values ('C6', 'Drama');
-- insert into OWNEDBOOK (OUsername, OBook) values ('C7', 'Action');
-- insert into OWNEDBOOK (OUsername, OBook) values ('C8', 'Adventure');
-- insert into OWNEDBOOK (OUsername, OBook) values ('C9', 'Technology');
-- insert into OWNEDBOOK (OUsername, OBook) values ('C10', 'Reference');

--SELLINGBOOK data--
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
