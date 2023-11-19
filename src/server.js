// require path module from nodejs
//const path = require('path');
//const express = require('express') // common js module
import path from 'path' // es module
import express from 'express' // es module
import "dotenv/config" // import the config function from env package to load the environment variable from the .env file
import { fileURLToPath } from 'url';
import { dirname } from 'path';

///Render file .ejs with css applied
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
//const port = 8080 // port => hard code
const port = process.env.PORT || 8888 // port => dynamic , nếu bị lôi thìn sẽ dùng port 8888

// config template engine
app.set('views', './views/');
//app.set('views', path.join(__dirname, 'views')); // __dirname is the current directory
app.set('view engine', 'ejs');

//config static file
app.use(express.static(path.join(__dirname, 'public')));


// khai báo router
app.get('/login', (req, res) => {
  res.render('login.ejs')
})

app.get('/forgotPass', (req, res) => {
  res.render('forgotPass.ejs')
})

app.get('/otp', (req, res) => {
  res.render('otp.ejs')
})

app.get('/signUp', (req, res) => {
  res.render('signUp.ejs')
})

app.get('/homepage', (req, res) => {
    //res.send('Check out our homepage') // send text
    res.render('home.ejs') // res.render() to render a template file : tạo view dynamic 
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})