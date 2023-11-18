
const path = require('path');
// config function from env package to load the environment variable from the .env file
require('dotenv').config({
    override: true,
    path: path.join(__dirname, 'development.env')
});
const {Pool,Client} = require('pg'); // import the pool and client from the pg.js file to do the connection
// a client static connection to the postgresql server while the pool is a dynamic connection that automatic reconnect functionality
// pool object is conection pool ưhile client object is a single connection concurrente request or frequent query
// because it connect to the pos server carries a fair amount of overhead
// connect through environment variable 
// we can set up diferent database for development and production

// to connect postgre with a connection pool we need to create a pool object 
// supply environment variable to the pool object that we created ín the env file
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
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

