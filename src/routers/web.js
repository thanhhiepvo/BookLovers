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
import payOS from '../models/payos.js';
import 'dotenv/config';

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('msg') })
});

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
        const cart = await bookController.getShoppingCart(req, res);
        res.render('about', { user: user, nItems_in_cart: cart.length });
    } else {
        res.redirect('/login');
    }
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
                nItems_in_cart: cart.length,
            });
        } catch (error) {
            console.error(error);
        }
    } else {
        res.redirect('/login');
    }
    console.log(">>> req.session.username = ", req.session.username);
});

router.post('/search-query', await bookController.getSearchBook);

router.get('/myBook', async (req, res) => {
    if (req.session.username) {
        try {
            const user = await authenController.getProfileUser(req, res);
            const listOwnedBook = await bookController.getBookOwned(req, res);
            const cart = await bookController.getShoppingCart(req, res);
            const flashMessages = req.flash('msg'); // get flash message from req.flash controller
            if (flashMessages.length > 0) {
                req.session.message = flashMessages;
                //console.log(req.session.message);
            }
            const message = req.session.message || [];
            req.session.message = null;
            res.render('myBook', {
                user: user,
                books: listOwnedBook,
                nItems_in_cart: cart.length,
                message: message
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
                nItems_in_cart: cart.length,
                message: req.flash('msg')
            });
        } catch (error) {
            console.error(error);
        }
    } else {
        res.redirect('/login');
    }
})

router.post('/sellbook-remove', bookController.delSellBook);

router.get('/upload', async (req, res) => {
    if (req.session.username) {
        const user = await authenController.getProfileUser(req, res);
        const cart = await bookController.getShoppingCart(req, res);
        res.render('upload.ejs', {
            user: user,
            nItems_in_cart: cart.length
        }); // Render the view with user data

    } else {
        res.redirect('/login');
    }
});

let id = null;
let temp = null;
let already = false;
let count = 0;

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
        // check book existence and return id
        if (!already) {
            try {
                temp = await bookController.addUserSelling(req);
                already = true;
                id = temp.bookid;
            } catch (error) {
                cb(new Error('Error in addUserSelling'), false);
            }
        }

        // if new book then accept file
        if (temp.check) {
            // check file format
            if (file.fieldname === 'bcover_pic') {
                if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                    cb(new Error('Only image files are allowed!'), false);
                    return;
                }
            }
            if (file.fieldname === 'pdf_book') {
                if (!file.originalname.match(/\.(pdf|PDF)$/)) {
                    cb(new Error('Only PDF files are allowed!'), false);
                    return;
                }
            }
            count++;
            cb(null, true);
        }
        // if old book then reject file
        else {
            count++;
            cb(null, false);
        }

        //reset for other new upload book
        if (count == 2) {
            already = false;
            count = 0;
        }
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
        const invoice = await walletController.getUserInvoiceInfo(req, res);
        res.render('wallet', {
            user: user,
            nItems_in_cart: cart.length,
            invoice: invoice
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
            nItems_in_cart: cart.length
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
            //console.log(req.flash('msg'));
            const flashMessages = req.flash('msg'); // get flash message from req.flash controller
            if (flashMessages.length > 0) {
                req.session.message = flashMessages;
                //console.log(req.session.message);
            }
            const message = req.session.message || [];
            req.session.message = null;
            res.render('book', {
                user: user,
                books: book,
                selluser: selluser,
                nItems_in_cart: cart.length,
                message: message
            });
        }
        catch (error) {
            console.error(error);
        }
    } else if (req.session.username && !isEmpty) {
        await bookController.addToCart(req, res);
        req.session.message = req.flash('msg');
        res.redirect('/book/' + req.query.ShopBook);
    } else {
        res.redirect('/login');
    }
    // console.log(">>> req.session.username = ", req.session.username);
});

router.post('/submit-report', reportController.createReport);

router.post('/buy-now', walletController.buyOneBook);

router.get('/cart', async (req, res) => {
    let check = Object.keys(req.query);
    let isEmpty = check.every(key => !req.query[key]);
    if (req.session.username && isEmpty) {
        const user = await authenController.getProfileUser(req, res);
        const bookCart = await bookController.getShoppingCart(req, res);
        const total_price = await bookController.getTotalPrice(req, res);
        const flashMessages = req.flash('msg'); // get flash message from req.flash controller
        if (flashMessages.length > 0) {
            req.session.message = flashMessages;
        }
        const message = req.session.message || [];
        req.session.message = null;
        res.render('shoppingCart', {
            user: user,
            bookCart: bookCart,
            total_price: total_price,
            message: message
        }); // Render the view with user data
    } else if (req.session.username && !isEmpty) {
        await bookController.addToCart(req, res);
        res.redirect('/cart');
    } else {
        res.redirect('/login');
    }
})

router.post('/cart-remove', bookController.removeFromCart);

router.post('/checkout', walletController.checkout);

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


router.post('/create-payment-link', async (req, res) => {
    const str = (req.body.amount).slice(0, -2);
    let cleanStr = "";
    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (char !== ".") {
            cleanStr += char;
        }
    }
    const YOUR_DOMAIN = `http://localhost:${process.env.PORT ?? 8888}`;
    const body = {
        orderCode: Number(String(Date.now()).slice(-6)),
        buyerName: req.session.body,
        amount: +cleanStr, //chuyen sang dang so 
        description: 'Deposit into BookLovers',
        returnUrl: `${YOUR_DOMAIN}/success`,
        cancelUrl: `${YOUR_DOMAIN}/cancel`
    };

    try {
        const paymentLinkResponse = await payOS.createPaymentLink(body);
        res.redirect(paymentLinkResponse.checkoutUrl);
    } catch (error) {
        console.error(error);
        res.send('Something went error');
    }
});

router.get('/success', async (req, res) => {
    if (req.session.username){
        const paymentinfo = await payOS.getPaymentLinkInfomation(req.query.id);
        if (paymentinfo.status == "PAID"){
            req.body.amount = paymentinfo.amountPaid;
            await walletController.addMoneyToAccount(req, res);
        }
        res.render('success.ejs');
    }
    else res.redirect('/login');
});

router.get('/cancel', (req, res) => {
    if (req.session.username) {
        res.render('cancel.ejs');
    }
    else res.redirect('/login');
});

export default router;
