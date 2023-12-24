import pool from '../database.js'

//get all book that currently selling
export async function getAllSellingBook() {
    const { rows } = await pool.query('SELECT SBook, SPrice FROM SELLINGBOOK');
    if (rows.length == 0)
        return null;
    return rows;
}

export async function getInfoAllBook() {
    const text = "SELECT * FROM BOOK";
    const { rows } = await pool.query(text);
    if (rows.length == 0)
        return null;
    return rows;
} 
