import express from 'express' // es module
import authenController from '../controllers/authenticationController.js';
import walletController from '../controllers/walletController.js';
import profileController from '../controllers/editProfileController.js';
import myBooksController from '../controllers/myBooksController.js'
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
    res.render('otp.ejs', { message: req.flash('msg') });
})

router.post('/otp-check', emailmodule.emailMethod.checkOTP);

router.get('/about', async (req, res) => {
    if (req.session.username) {
        const user = await authenController.getProfileUser(req, res);
        res.render('about', { user: user });
    } else {
        res.redirect('/login');
    }
})

router.get('/editProfile', (req, res) => {
    res.render('editProfile.ejs')
})

router.get('/book', (req, res) => {
    res.render('book.ejs')
})

// router.get('/editProfile', (req, res) => {
//     res.render('editProfile.ejs')
// })

router.get('/signUp', (req, res) => {
    res.render('signUp.ejs', { message: req.flash('msg') })
})
router.post('/create-user', authenController.postCreateUser);

router.get('/homepage', async (req, res) => {
    if (req.session.username) {
        try {
            const book = await bookController.getInfoBook(req, res);
            const user = await authenController.getProfileUser(req, res);
            //books = book;
            res.render('home', {
                user: user,
                books: book
            });
        } catch (error) {
            console.error(error);
        }
    } else {
        res.redirect('/login');
    }
    console.log(">>> req.session.username = ", req.session.username);
});

router.get('/myBook', myBooksController.getMyBooksInfo);
/*
router.get('/myBook', (req, res) => {
    if (req.session.username) {
        res.render('myBook', { username: req.session.username, email: req.session.email, ballance: req.session.ballance });
    } else {
        res.redirect('/login');
    }
})
*/

router.get('/wallet', async (req, res) => {
    if (req.session.username) {
        const user = await authenController.getProfileUser(req, res);
        res.render('wallet', { user: user }); // Render the view with user data
    } else {
        res.redirect('/login');
    }
})

router.get('/editProfile', async (req, res) => {
    if (req.session.username) {
        const user = await authenController.getProfileUser(req, res);
        res.render('editProfile', { user: user }); // Render the view with user data
    } else {
        res.redirect('/login');
    }
})
router.post('/edit-profile', profileController.updateInfo)

router.get('/logout', authenController.logout);

export default router;
