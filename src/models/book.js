import pool from '../database.js'

export async function getUserOwned(ID_Book) {
    const text = "SELECT OUser FROM OWNEDBOOK WHERE OBook = $1"
    const value = [ID_Book];
    const { rows } = await pool.query(text, value);
    console.log(rows);
    if (rows.length == 0)
        return null;
    return rows.map(row => row.ouser);
}

export async function getUserSellingBook(ID_Book) {
    const text = "SELECT SUser FROM SELLINGBOOK WHERE SBook = $1"
    const value = [ID_Book];
    const { rows } = await pool.query(text, value);
    console.log(rows);
    if (rows.length == 0)
        return null;
    return rows.map(row => row.suser);
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
    const text = "SELECT * FROM BOOK WHERE ID_Book = $1";
    const value = [ID_Book];
    const { rows } = await pool.query(text, value);
    // console.log(rows);
    if (rows.length == 0)
        return null; 
    return rows[0];
} 
