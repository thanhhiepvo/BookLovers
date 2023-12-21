import pool from '../database.js'

export async function banuser(Username) {
    const text = "UPDATE USERACCOUNT SET States = 'false' WHERE Username = $1";
    const value = [Username];
    await pool.query(text, value);
    console.log('Banned successfully');
}