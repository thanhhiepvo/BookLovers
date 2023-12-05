
import pool from '../database.js'

export async function getUsername(username) {
    const { rows } = await pool.query('SELECT * FROM useraccount WHERE username = $1', [username]);
    console.log(rows)
    if(rows[0] == null)
        return null;
    return rows[0];
}
// export async function getUsername(username) {
//     const { rows } = await pool.query('SELECT * FROM useraccount WHERE username = $1', [username]);
//     if(rows[0] == null)
//         return null;
//     return rows[0];
// }

export const insertUserAccount = async (username, email, password) => {
    try {
        // Insert data into the useraccount table
        const text = 'INSERT INTO useraccount(username, email, pass, balance) VALUES($1, $2, $3, $4)';
        const values = [username, email, password,0];
        await pool.query(text, values);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send("Error creating user");
    } 
}

export const updateNewPassword = async (username, new_password) => {
    try {
        const text = 'UPDATE useraccount SET Pass = $1 WHERE username = $2';
        const values = [new_password, username]
        await pool.query(text, values);
        console.log('New password was changed in database');
    } catch (error) {
        
    }
}