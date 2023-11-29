
import express from 'express' // es module
import { getHomePage, loginUser, postCreateUser} from '../controllers/homeController.js';
const router = express.Router()

//router.Method('/routers', handler function)
router.get('/', getHomePage) ;

router.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('msg') })
})
router.post('/login-user', loginUser);

router.get('/forgotPass', (req, res) => {
    res.render('forgotPass.ejs')
})
  
router.get('/otp', (req, res) => {
    res.render('otp.ejs')
})
  
router.get('/about', (req, res) => {
    res.render('about.ejs')
})

router.get('/myBook', (req, res) => {
    res.render('myBook.ejs')
})

router.get('/signUp', (req, res) => {
    res.render('signUp.ejs')
})
router.post('/create-user', postCreateUser);
  
router.get('/homepage', (req, res) => {
      //res.send('Check out our homepage') // send text
      res.render('home.ejs'); // res.render() to render a template file : tạo view dynamic 
})

router.get('/wallet', (req, res) => {
    //res.send('Check out our homepage') // send text
    res.render('wallet.ejs') // res.render() to render a template file : tạo view dynamic 
})
export default router;

  