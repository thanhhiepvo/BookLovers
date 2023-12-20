import pool from '../database.js'

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
    const text = "SELECT SUsername FROM SELLINGBOOK WHERE SBook = $1"
    const value = [ID_Book];
    const { rows } = await pool.query(text, value);
    console.log(rows);
    if (rows.length == 0)
        return null;
    return rows.map(row => row.susername);
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
    const text = "SELECT * FROM BOOK WHERE ID_Book = $1";
    const value = [ID_Book];
    const { rows } = await pool.query(text, value);
    // console.log(rows);
    if (rows.length == 0)
        return null;
    return rows[0];
}