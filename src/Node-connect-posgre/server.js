// require path module from nodejs
//const path = require('path');
//const express = require('express') // common js module
import path from 'path' // es module
import express from 'express' // es module
import "dotenv/config" // import the config function from env package to load the environment variable from the .env file
const app = express()
//const port = 8080 // port => hard code
const port = process.env.PORT || 8888 // port => dynamic , nếu bị lôi thìn sẽ dùng port 8888


// khai báo router
app.get('/', (req, res) => {
  res.send('Hello World! & Welcome to Node-connect-posgre ')
})

// config template engine
app.set('views', './views/');
//app.set('views', path.join(__dirname, 'views')); // __dirname is the current directory
app.set('view engine', 'ejs');

app.get('/homepage', (req, res) => {
    //res.send('Check out our homepage') // send text
    res.render('sample.ejs') // res.render() to render a template file : tạo view dynamic 
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})