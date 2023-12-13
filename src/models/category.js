import pool from '../database.js'

export async function getCategoryInfo(ID_Category) {
    const text = "SELECT * FROM CATEGORY WHERE ID_Category = $1"
    const value = [ID_Category];
    const { rows } = await pool.query(text, value);
    console.log(rows);
    if (rows.length == 0)
        return null;
    return rows[0];
}