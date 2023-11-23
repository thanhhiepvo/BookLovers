
import pool from '../database.js'

export const insertUserAccount = async (username, email, password) => {
    const client = await pool.connect(); // connect to the pool
    try {
        // Insert data into the useraccount table
        const text = 'INSERT INTO useraccount(username, email, pass) VALUES($1, $2, $3)';
        const values = [username, email, password];
        await client.query(text, values);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error executing query', error);
    } finally {
        client.release(); // release the client back to the pool
    }
}