import express from 'express' // es module
import authenController from '../controllers/authenticationController.js';
import walletController from '../controllers/walletController.js';
import profileController from '../controllers/editProfileController.js';
import bookController from '../controllers/bookController.js';
import emailMethod from '../controllers/emailController.js';
import reportController from '../controllers/reportController.js';
import adminMethod from '../controllers/adminController.js';
import multer from "multer";
import path from 'path';
import fs from 'fs';
import appRoot from 'app-root-path';



const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('msg') })
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

router.get('/homepage/cart', (req, res) => {
    res.render('cart.ejs', { message: req.flash('msg') });
})

router.get('/admin', async (req, res) => {
    let check = Object.keys(req.query);
    let isEmpty = check.every(key => !req.query[key]);
    if (req.session.username && isEmpty) {
        try {
            const reportlist = await reportController.getAllReportInfo();
            res.render('admin', {
                message: req.flash('msg'),
                reportlist: reportlist,
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    else if (req.session.username && !isEmpty) {
        await adminMethod.banUser(req, res);
    }
    else {
        res.redirect('/login');
    }
    // console.log(">>> req.session.username = ", req.session.username);
})

router.get('/signUp', (req, res) => {
    res.render('signUp.ejs', { message: req.flash('msg') })
})


router.post('/create-user', authenController.postCreateUser);

router.get('/homepage', async (req, res) => {
    if (req.session.username) {
        try {
            const book = await bookController.getAllBookInfo(req, res);
            const user = await authenController.getProfileUser(req, res);
            const cart = await bookController.getShoppingCart(req, res);
            res.render('home', {
                user: user,
                books: book,
                num: cart.length
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
            const listOwnedBook = await bookController.getBookOwned(req, res);
            const cart = await bookController.getShoppingCart(req, res);
            res.render('myBook', {
                user: user,
                books: listOwnedBook,
                num: cart.length
            });
        } catch (error) {
            console.error(error);
        }
    } else {
        res.redirect('/login');
    }
})

router.get('/selling', async (req, res) => {
    if (req.session.username) {
        try {
            const user = await authenController.getProfileUser(req, res);
            const listSellBook = await bookController.getBookSell(req, res);
            const cart = await bookController.getShoppingCart(req, res);
            res.render('selling', {
                user: user,
                books: listSellBook,
                num: cart.length
            });
        } catch (error) {
            console.error(error);
        }
    } else {
        res.redirect('/login');
    }
})

router.get('/upload', async (req, res) => {
    if (req.session.username) {
        const user = await authenController.getProfileUser(req, res);
        const cart = await bookController.getShoppingCart(req, res);
        res.render('upload.ejs', {
            user: user,
            num: cart.length
        }); // Render the view with user data

    } else {
        res.redirect('/login');
    }
});

let id = null;
let temp = null;
let already = false;

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            if (file.fieldname === 'bcover_pic') {
                cb(null, appRoot + "/public/Picture/book");
            } else if (file.fieldname === 'pdf_book') {
                cb(null, appRoot + "/public/Book_PDF");
            } else {
                cb(new Error('Invalid fieldname'));
            }
        },
        filename: function (req, file, cb) {
            let ext = path.extname(file.originalname).toLowerCase();
            ext = ext.replace('.jpeg', '.jpg').replace('.png', '.jpg');
            cb(null, id + ext);
        }
    }),
    fileFilter: async function (req, file, cb) {
        if (!already) {
            try {
                temp = await bookController.addUserSelling(req);
                already = true;
            } catch (error) {
                // handle error
                cb(new Error('Error in addUserSelling'), false);
                return;
            }
        }
        id = temp.bookid;
        if (temp.check) {
            if (file.fieldname === 'bcover_pic') {
                if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                    cb(new Error('Only image files are allowed!'), false);
                    return;
                }
            } else if (file.fieldname === 'pdf_book') {
                if (!file.originalname.match(/\.(pdf|PDF)$/)) {
                    cb(new Error('Only PDF files are allowed!'), false);
                    return;
                }
            }
            cb(null, true);
        }
        else cb(null, false);
    }
});
router.post('/uploadSelling', (req, res) => {
    upload.fields([
        { name: 'bcover_pic', maxCount: 1 },
        { name: 'pdf_book', maxCount: 1 }
    ])(req, res, function (err) {
        if (err) {
            req.fileValidationError = err.message;
            console.log(req.fileValidationError);
            res.redirect('/upload');
        } else {
            res.redirect('/selling');
        }
    });
});


router.get('/wallet', async (req, res) => {
    if (req.session.username) {
        const user = await authenController.getProfileUser(req, res);
        const cart = await bookController.getShoppingCart(req, res);
        res.render('wallet', {
            user: user,
            num: cart.length
        }); // Render the view with user data
    } else {
        res.redirect('/login');
    }
})

router.get('/editProfile', async (req, res) => {
    if (req.session.username) {
        const user = await authenController.getProfileUser(req, res);
        const cart = await bookController.getShoppingCart(req, res);
        res.render('editProfile', {
            user: user,
            num: cart.length
        }); // Render the view with user data
    } else {
        res.redirect('/login');
    }
})
router.post('/edit-profile', profileController.updateInfo)
// router.get('/book', profileController.getInfo);

router.get('/book/:idbook', async (req, res) => {
    let check = Object.keys(req.query);
    let isEmpty = check.every(key => !req.query[key]);
    if (req.session.username && isEmpty) {
        try {
            const book = await bookController.getBookInfo(req, res);
            const user = await authenController.getProfileUser(req, res);
            const selluser = await bookController.getUserSellingBook(req, res);
            const cart = await bookController.getShoppingCart(req, res);
            //books = book;
            res.render('book', {
                user: user,
                books: book,
                selluser: selluser,
                num: cart.length
            });
        } catch (error) {
            console.error(error);
        }
    }
    else if (req.session.username && !isEmpty) {
        await bookController.addToCart(req, res);
    }
    else {
        res.redirect('/login');
    }
    // console.log(">>> req.session.username = ", req.session.username);
});

router.post('/submit-report', reportController.createReport);

router.get('/cart', async (req, res) => {
    if (req.session.username) {
        const user = await authenController.getProfileUser(req, res);
        const bookCart = await bookController.getShoppingCart(req, res);
        res.render('shoppingCart', {
            user: user,
            bookCart: bookCart
        }); // Render the view with user data
    } else {
        res.redirect('/login');
    }
})
router.get('/pdf/:filename', function (req, res) {
    const fileName = req.params.filename;
    const filePath = path.join(appRoot.path, 'public', 'Book_PDF', fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
        // If file does not exist, redirect to mybook.ejs
        res.redirect('/mybook');
        return;
    }

    const stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': stat.size
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});
router.get('/logout', authenController.logout);

export default router;
