import pool from '../database.js'

export async function banUser(Username) {
    const text = "UPDATE USERACCOUNT SET States = 'false' WHERE Username = $1";
    const value = [Username];
    await pool.query(text, value);
    console.log('Banned user successfully');
    return "Banned user successfully";
}

export async function checkout(Username, Price) {
    const result = await pool.query({
        text: "CALL Payment ($1, $2, $3)",
        values: [Username, Price, null],
        type: "procedure"
    });
    return result.rows[0].v_state;
}

export async function getSearchBook(searchquery) {
    const { rows } = await pool.query({
        text: "SELECT ID_Book FROM BOOK WHERE NameBook ILIKE '%' || $1 || '%' OR Author ILIKE '%' || $1 || '%'",
        values: [searchquery]
    });
    if (rows.length == 0)
        return null;
    return rows.map(row => row.id_book);
}

export async function addMoneyToAccount(Username, amount) {
    await pool.query({
        text: "UPDATE USERACCOUNT SET Balance = Balance + $2 WHERE Username = $1",
        values: [Username, amount]
    });
    await pool.query({
        text: "INSERT INTO INVOICE (IUsername, DateInvoice, Total, IType) VALUES ($1, NOW(), $2, 'false')",
        values: [Username, amount]
    }); 
    console.log("Deposit money into account successfully!");
}