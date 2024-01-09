//const express = require('express') // common js module
import path from 'path' // es module
import express from 'express' // es module
import "dotenv/config" // import the config function from env package to load the environment variable from the .env file
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'express-flash';
import cookieParser from 'cookie-parser';

import webRouter from './routers/web.js' // import router from routers/web.js
import api from './routers/api.js'

///Render file .ejs with css applied
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express() // create an instance of the Express application

const oneHour = 1000 * 60 * 60;

//const port = 8080 // port => hard code
const port = process.env.PORT || 8888  // port => dynamic , nếu bị lỗi thì sẽ dùng port 8888
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config template engine
app.set('views', './views/');
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: oneHour }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(flash());
app.use('/', webRouter); // use router
app.use('/', api); // use router

//config static file
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`http://localhost:${port}/login`)
})

