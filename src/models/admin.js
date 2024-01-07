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