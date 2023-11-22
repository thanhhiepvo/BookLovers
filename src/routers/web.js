
// khai báo router

/* The code `import express from 'express' // es module` is importing the Express framework as a
module. This allows you to use the functionalities provided by Express in your code. The `express`
variable is assigned the value of the imported Express module, which can then be used to create an
instance of the Express application and define routes. */
import express from 'express' // es module
// .. is the parent directory of the current directory
import { getHomePage } from '../controllers/homeController.js';
/* `const router = express.Router()` is creating a new router object using the Express framework. This
router object can be used to define routes for specific URL paths and HTTP methods. It allows you to
modularize your routes and separate them into different files or modules. */
const router = express.Router()

//router.Method('/routers', handler function)
router.get('/', getHomePage) ;

/* The code `router.get('/login', (req, res) => {
    res.render('login.ejs')
})` is defining a route for the GET HTTP method with the URL path '/login'. */
router.get('/login', (req, res) => {
    res.render('login.ejs')
})
  
router.get('/forgotPass', (req, res) => {
    res.render('forgotPass.ejs')
})
  
router.get('/otp', (req, res) => {
    res.render('otp.ejs')
})
  
router.get('/signUp', (req, res) => {
    res.render('signUp.ejs')
})
  
router.get('/homepage', (req, res) => {
      //res.send('Check out our homepage') // send text
      res.render('home.ejs') // res.render() to render a template file : tạo view dynamic 
})

router.get('/wallet', (req, res) => {
    //res.send('Check out our homepage') // send text
    res.render('wallet.ejs') // res.render() to render a template file : tạo view dynamic 
})
export default router;

  