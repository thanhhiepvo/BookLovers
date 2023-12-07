import express from 'express' // es module
import authenController from '../controllers/authenticationController.js';
import walletController from '../controllers/walletController.js';
import profileController from '../controllers/editprofileController.js';
import bookController from '../controllers/bookController.js';
import emailmodule from '../controllers/emailController.cjs';
const router = express.Router()

//router.Method('/routers', handler function)
//router.get('/', getHomePage) ;

router.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('msg') })
    console.log(">>> req.session.username = ", req.session.username);
})
router.post('/login-user', authenController.loginUser);

router.get('/forgotPass', (req, res) => {
    res.render('forgotPass.ejs', { message: req.flash('msg') });
})
router.post('/forgot-pass', authenController.forgotPassword);
  
router.get('/otp', (req, res) => {
    res.render('otp.ejs', {message: req.flash('msg') });
})
  
router.post('/otp-check', emailmodule.checkOTP)

router.get('/about', (req, res) => {
    res.render('about.ejs', )
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
  
router.get('/homepage', async(req, res) => {
      //res.send('Check out our homepage') // send text
      var books;
    if (req.session.username) {
        // bookController.getInfoBook(req, res).then(book => {
        //     //console.log(book)
        //     books = book;
        //     res.render('home', { username: req.session.username, email: req.session.email, ballance: req.session.ballance , books: book}); 
        //     //console.log(">>> req.session.username = ", books);
        // }).catch(error => {
        //     console.error(error);
        // });
        // res.render() to render a template file : tạo view dynamic
        try {
            const book = await bookController.getInfoBook(req, res);
            books = book;
            res.render('home', { 
                username: req.session.username, 
                email: req.session.email, 
                ballance: req.session.ballance, 
                books: book
            }); 
        } catch (error) {
            console.error(error);
        }
    } else {
      res.redirect('/login');
    }
    console.log(">>> req.session.username = ", req.session.username);
    //console.log("REQ.BOOK = ", req.book);
});
// router.get('/homepage', bookController.getInfoBook);

router.get('/wallet', walletController.getWalletInfo);
router.get('/editProfile', profileController.getInfo);
export default router;

  