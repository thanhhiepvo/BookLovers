import path from 'path' // es module
import express from 'express' // es module
import "dotenv/config" // import the config function from env package to load the environment variable from the .env file
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from "body-parser"; //  body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.

import webRouter from './routers/web.js' // import router from routers/web.js


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express() // create an instance of the Express application
//const port = 8080 // port => hard code
const port = process.env.PORT || 8888 // port => dynamic , nếu bị lôi thìn sẽ dùng port 8888


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());

// config template engine
app.set('views', './views/');
/* `app.set('view engine', 'ejs');` is setting the view engine for the Express application to EJS
(Embedded JavaScript). */
app.set('view engine', 'ejs');

/* `app.use('/', webRouter)` is setting up a middleware function for the Express application. It
specifies that any incoming request with a URL path starting with '/' should be handled by the
`webRouter` router. The `webRouter` router is responsible for handling the routes and logic for the
web application. */
app.use('/', webRouter); // use router

/* `app.use(express.static(path.join(__dirname, 'public')));` is configuring the Express application to
serve static files from the 'public' directory. */
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})