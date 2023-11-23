import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from 'path';
import dotenv from 'dotenv';
import pkg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
    override: true,
    path: join(__dirname, '.env')
});

const { Pool, Client } = pkg;

// pool object is conection pool ưhile client object is a single connection concurrente request or frequent query
// because it connect to the pos server carries a fair amount of overhead
// connect through environment variable 
// we can set up diferent database for development and production

// to connect postgre with a connection pool we need to create a pool object 
// supply environment variable to the pool object that we created ín the env file
const pool = new Pool({
    user: process.env.POS_USER,
    host: process.env.POS_HOST,
    database: process.env.POS_DATABASE,
    password: process.env.POS_PASSWORD,
    port: process.env.POS_PORT
});
export default pool;

//this pool initailly empty and client are created when they need to be used

// (async () => {
//     const client = await pool.connect(); // connect to the pool
//     try {
//         // Query the useraccount table
//         const { rows } = await client.query('SELECT * FROM useraccount');
//         console.log(rows);
//     } catch (error) {
//         console.error('Error executing query', error);
//     } finally {
//         client.release(); // release the client back to the pool
//     }
// })();

// const insertUserAccount = async (username, email, password) => {
//     const client = await pool.connect(); // connect to the pool
//     try {
//         // Insert data into the useraccount table
//         const text = 'INSERT INTO useraccount(username, email, pass) VALUES($1, $2, $3)';
//         const values = [username, email, password];
//         await client.query(text, values);
//         console.log('Data inserted successfully');
//     } catch (error) {
//         console.error('Error executing query', error);
//     } finally {
//         client.release(); // release the client back to the pool
//     }
// }

// insertUserAccount('test', 'tratom', '123456');