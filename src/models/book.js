import pool from '../database.js'
import { getCategoryInfo } from '../models/category.js'

// Lay danh sach cac user so huu sach (ID_Book)
export async function getUserOwned(ID_Book) {
    const text = "SELECT OUsername FROM OWNEDBOOK WHERE OBook = $1"
    const value = [ID_Book];
    const { rows } = await pool.query(text, value);
    console.log(rows);
    if (rows.length == 0)
        return null;
    return rows.map(row => row.ousername);
}

// Lay danh sach cac sach ma user so huu
export async function getBookOwned(OUsername) {
    const text = "SELECT OBook FROM OWNEDBOOK WHERE OUsername = $1"
    const value = [OUsername];
    const { rows } = await pool.query(text, value);
    console.log(rows);
    if (rows.length == 0)
        return null;
    return rows.map(row => row.obook);
}

// Lay danh sach cac user dang ban cuon sach (ID_Book)
export async function getUserSellingBook(ID_Book) {
    const text = "SELECT SUsername, SPrice FROM SELLINGBOOK WHERE SBook = $1"
    const value = [ID_Book];
    const { rows } = await pool.query(text, value);
    console.log(rows);
    if (rows.length == 0)
        return null;
    return rows;
}

// Lay danh sach cac sach ma user dang ban
export async function getBookSell(SUsername) {
    const text = "SELECT SBook, SPrice FROM SELLINGBOOK WHERE SUsername = $1"
    const value = [SUsername];
    const { rows } = await pool.query(text, value);
    console.log(rows);
    if (rows.length == 0)
        return null;
    return rows;
}

export async function checkBook(relativebookname, author, publishedyear) {
    const text = "SELECT ID_Book FROM BOOK B WHERE B.NameBook LIKE '%' || $1 || '%' AND B.Author = $2 AND EXTRACT(YEAR FROM B.PublishedYear) = $3";
    const value = [relativebookname, author, publishedyear];
    const { rows } = await pool.query(text, value);
    // console.log(rows);
    if (rows.length == 0)
        return null;
    return rows[0].id_book;
}

export async function getBookInfo(ID_Book) {
    const textbook = "SELECT * FROM BOOK WHERE ID_Book = $1";
    const value = [ID_Book];
    const { rows } = await pool.query(textbook, value);
    // console.log(rows);
    if (rows.length == 0)
        return null;
    const textcategory = "SELECT BCCategory FROM BOOKCATEGORY WHERE BCBook = $1";
    const { rows: bookcategorylist } = await pool.query(textcategory, value);
    const bookcategory = bookcategorylist.map(category => category.bccategory);
    let categoryname = [];
    for (let categoryid of bookcategory) {
        let name = await getCategoryInfo(categoryid);
        categoryname.push(name.namecategory);
    }
    let result = categoryname.join(", ");
    rows[0].category = result;
    return rows[0];
} 

export async function addBook(NameBook, Author, Description, PublishedYear) {
    const text = "INSERT INTO BOOK (NameBook, Author, Description, PublishedYear) values ($1, $2, $3, $4)";
    const value = [NameBook, Author, Description, PublishedYear];
    await pool.query(text, value);
    console.log('Added book successfully');
}

export async function delBook(ID_Book) {
    const text = "DELETE FROM BOOK WHERE ID_Book = $1";
    const value = [ID_Book];
    await pool.query(text, value);
    console.log('Book deleted successfully');
}

export async function addSellBook(SUsername, SBook, SPrice) {
    const text = "INSERT INTO SELLINGBOOK (SUsername, SBook, SPrice) values ($1, $2, $3)";
    const value = [SUsername, SBook, SPrice];
    await pool.query(text, value);
    console.log('Added user sell book successfully');
}

export async function delSellBook(SUsername, SBook) {
    const text = "DELETE FROM SELLINGBOOK WHERE SUsername = $1 AND SBook = $2";
    const value = [SUsername, SBook];
    await pool.query(text, value);
    console.log('User sell book deleted successfully');
}

export async function addOwnedBook(OUsername, OBook) {
    const text = "INSERT INTO OWNEDBOOK (OUsername, OBook) values ($1, $2)";
    const value = [OUsername, OBook];
    await pool.query(text, value);
    console.log('Added user owned book successfully');
}

export async function delOwnedBook(OUsername, OBook) {
    const text = "DELETE FROM OWNED WHERE OUsername = $1 AND OBook = $2";
    const value = [OUsername, OBook];
    await pool.query(text, value);
    console.log('User owned book deleted successfully');
}
