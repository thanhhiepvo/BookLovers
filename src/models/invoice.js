import pool from '../database.js'

export async function geInvoiceInfo(ID_Invoice) {
    const text = "SELECT * FROM INVOICE WHERE ID_Invoice = $1";
    const value = [ID_Invoice];
    const { rows } = await pool.query(text, value);
    console.log(rows);
    if (rows.length == 0)
        return null;

    if (rows[0].itype) {
        const new_text = "SELECT * FROM TRANSAC WHERE ID_Transac = $1";
        const { rows:transac } = await pool.query(new_text, value);
        console.log(transac);
        if (transac.length == 0)
            return null;
        return transac[0];
    }
    
    return rows[0];
}