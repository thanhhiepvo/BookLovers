import pool from '../database.js'

export async function getOwnedBookInfo(listID_Book) {
    const text = "SELECT NameBook, Author, Description, PublishedYear, PDFBookFile FROM Book WHERE IDBook IN $1";
    const value = [listID_Book];
    const { listOwnedBook } = await pool.query(text, value);
    if(listOwnedBook[0] == null)
        return null;
    return listOwnedBook;
}