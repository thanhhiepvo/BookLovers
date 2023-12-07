
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

export const updateProfile = async (username, email, fullname, phone, birth) => {
    try {
        const { rows } = await pool.query('SELECT * FROM useraccount WHERE username = $1', [username]);
        if (email == '')
            email = rows[0].email;
        if (fullname == '')
            fullname = rows[0].fullname;
        if (phone == '')
            phone = rows[0].phonenumber;
        if (birth == '')
            birth = rows[0].birth;
        const text = 'UPDATE useraccount SET email = $2, fullname = $3, phonenumber = $4, birth = $5 WHERE username = $1';
        const values = [username, email, fullname, phone, birth];
        await pool.query(text, values);
        console.log('Data updated successfully');
    } catch (error) {
        console.error('Error executing query', error);
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