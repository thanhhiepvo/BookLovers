import pool from '../database.js'

export async function getInfoAllBook () {
    const { rows } = await pool.query('SELECT * FROM book');
    return rows;
}