// require path module from nodejs
//const path = require('path');
//const express = require('express') // common js module
import path from 'path' // es module
import express from 'express' // es module
import "dotenv/config" // import the config function from env package to load the environment variable from the .env file
import { fileURLToPath } from 'url';
import { dirname } from 'path';


import webRouter from './routers/web.js' // import router from routers/web.js

//const webRouter = require('./routers/web.js'); // import router from routers/web.js
///Render file .ejs with css applied
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express() // create an instance of the Express application
//const port = 8080 // port => hard code
const port = process.env.PORT || 8888 // port => dynamic , nếu bị lôi thìn sẽ dùng port 8888

// config template engine
app.set('views', './views/');
//app.set('views', path.join(__dirname, 'views')); // __dirname is the current directory
app.set('view engine', 'ejs');
//khai báo router
/* `app.use('/', webRouter)` is setting up a middleware function for the Express application. It
specifies that any incoming request with a URL path starting with '/' should be handled by the
`webRouter` router. The `webRouter` router is responsible for handling the routes and logic for the
web application. */
app.use('/', webRouter); // use router
//config static file
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})