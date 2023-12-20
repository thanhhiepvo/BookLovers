import pool from '../database.js'

export async function getInvoiceInfo(ID_Invoice) {
    const text = "SELECT * FROM INVOICE WHERE ID_Invoice = $1";
    const value = [ID_Invoice];
    const { rows } = await pool.query(text, value);
    // console.log(rows);
    if (rows.length == 0)
        return null;

    if (rows[0].itype) {
        const new_text = "SELECT ID_Invoice, IUsername, DateInvoice, Total, IType, ID_Sender, TBook FROM INVOICE I JOIN TRANSAC T ON I.ID_Invoice = T.ID_Transac WHERE I.ID_Invoice = $1";
        const { rows: transac } = await pool.query(new_text, value);
        // console.log(transac);
        if (transac.length == 0)
            return null;
        return transac[0];
    }

    return rows[0];
}

export async function getInfoAllInvoice() {
    const text = "SELECT * FROM INVOICE";
    const { rows } = await pool.query(text);
    // console.log(rows);
    if (rows.length == 0)
        return null;

    let result = [];
    for (let row of rows) {
        if (row.itype) {
            const new_text = "SELECT ID_Invoice, IUsername, DateInvoice, Total, IType, ID_Sender, TBook FROM INVOICE I JOIN TRANSAC T ON I.ID_Invoice = T.ID_Transac WHERE I.ID_Invoice = $1";
            const new_value = [row.id_invoice]; //id_invoice viết thường mới được
            const { rows: transac } = await pool.query(new_text, new_value);
            if (transac.length != 0)
                result.push(transac[0]);
        }
        else {
            result.push(row);
        }
    }

    return result;
}
