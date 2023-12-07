import pool from '../database.js'

export async function getID_OwnedBooks(username) {
    const text = "SELECT OBook FROM OwnedBook WHERE OUsername = $1";
    const value = [username];
    const { listID_OwnedBooks } = await pool.query(text, value);
    // console.log('Query Owned Book');
    if(listID_OwnedBooks[0] == null)
        return null;
    return listID_OwnedBooks;
}