import express from 'express' // es module
import authenController from '../controllers/authenticationController.js';
import walletController from '../controllers/walletController.js';
import profileController from '../controllers/editProfileController.js';
import myBooksController from '../controllers/myBooksController.js'
import bookController from '../controllers/bookController.js';
import emailMethod from '../controllers/emailController.js';

const router = express.Router()

//router.Method('/routers', handler function)
//router.get('/', getHomePage) ;

router.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('msg') })
    // console.log(">>> req.session.username = ", req.session.username);
})
router.post('/login-user', authenController.loginUser);

router.get('/forgotPass', (req, res) => {
    res.render('forgotPass.ejs', { message: req.flash('msg') });
})
router.post('/forgot-pass', emailMethod.sendOTP);

router.get('/otp', (req, res) => {
    res.render('otp.ejs', { message: req.flash('msg') });
})

router.post('/otp-check', emailMethod.checkOTP);

router.get('/otp-resend', emailMethod.resendOTP);

router.get('/recoverPass', (req, res) => {
    res.render('recoverPass.ejs', { message: req.flash('msg') });
})

router.post('/recover-pass', authenController.forgotPassword)

router.get('/about', async (req, res) => {
    if (req.session.username) {
        const user = await authenController.getProfileUser(req, res);
        res.render('about', { user: user });
    } else {
        res.redirect('/login');
    }
})

// router.get('/book', async (req, res) => {
//     if (req.session.username) {
//         const user = await authenController.getProfileUser(req, res);
//         res.render('book', { user: user });
//     } else {
//         res.redirect('/login');
//     }
// })

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
router.get('/myBook', async (req, res) => {
    if (req.session.username) {
        try {
            const user = await authenController.getProfileUser(req, res);
            const listOwnedBook = await bookController.getInfoBook(req, res);
            res.render('myBook', {
                user: user,
                books: listOwnedBook
            });
        } catch (error) {
            console.error(error);
        }
    } else {
        res.redirect('/login');
    }
    // console.log(">>> req.session.username = ", req.session.username);
})

router.get('/selling', async (req, res) => {
    if (req.session.username) {
        try {
            const user = await authenController.getProfileUser(req, res);
            const listOwnedBook = await bookController.getInfoBook(req, res);
            res.render('selling', {
                user: user,
                books: listOwnedBook
            });
        } catch (error) {
            console.error(error);
        }
    } else {
        res.redirect('/login');
    }
    // console.log(">>> req.session.username = ", req.session.username);
})
router.get('/upload', async (req, res) => {
    if (req.session.username) {
        const user = await authenController.getProfileUser(req, res);
        res.render('upload.ejs', { user: user }); // Render the view with user data
    } else {
        res.redirect('/login');
    }
})

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
// router.get('/book', profileController.getInfo);

router.get('/book', async (req, res) => {
    if (req.session.username) {
        try {
            const book = await bookController.getInfoOneBook(req, res);
            const user = await authenController.getProfileUser(req, res);
            //books = book;
            res.render('book', {
                user: user,
                books: book
            });
        } catch (error) {
            console.error(error);
        }
    } 
    else {
        res.redirect('/login');
    }
    // console.log(">>> req.session.username = ", req.session.username);
});

router.get('/logout', authenController.logout);

export default router;
