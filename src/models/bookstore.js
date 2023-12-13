import pool from '../database.js'

//get all book that currently selling
export async function getAllSellingBook() {
    const { rows } = await pool.query('SELECT SBook FROM SELLINGBOOK');
    console.log(rows);
    if (rows.length == 0)
        return null;
    return rows.map(row => row.sbook);
}

export async function getInfoAllBook() {
    const text = "SELECT * FROM BOOK";
    const { rows } = await pool.query(text);
    console.log(rows);
    if (rows.length == 0)
        return null;
    return rows;
} 