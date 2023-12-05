
import express from 'express' // es module
import authenController from '../controllers/authenticationController.js';
import walletController from '../controllers/walletController.js';
import profileController from '../controllers/editprofileController.js';
const router = express.Router()

//router.Method('/routers', handler function)
//router.get('/', getHomePage) ;

router.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('msg') })
    console.log(">>> req.session.username = ", req.session.username);
})
router.post('/login-user', authenController.loginUser);

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

// router.get('/editProfile', (req, res) => {
//     res.render('editProfile.ejs')
// })

router.get('/signUp', (req, res) => {
    res.render('signUp.ejs', { message: req.flash('msg') })
})
router.post('/create-user', authenController.postCreateUser);
  
router.get('/homepage', (req, res) => {
      //res.send('Check out our homepage') // send text
    if (req.session.username) {
        res.render('home', { username: req.session.username, email: req.session.email, ballance: req.session.ballance }); 
        // res.render() to render a template file : tạo view dynamic
    } else {
      res.redirect('/login');
    }
    console.log(">>> req.session.username = ", req.session.username);
});

router.get('/wallet', walletController.getWalletInfo);
router.get('/editProfile', profileController.getInfo);
export default router;

  