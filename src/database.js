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
//this pool initailly empty and client are created when they need to be used

(async () => {
    const client = await pool.connect(); // connect to the pool
    try {
        // do some query
        const {rows} = await client.query('SELECT current_user');
        const currentUser = rows[0]['current_user'];
        console.log(currentUser);
    } catch (error) {
        console.log(error);
    } finally {
        client.release(); // release the client
        pool.end(); // end the pool
    }
})();

