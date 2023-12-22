import express from 'express' // es module
import authenController from '../controllers/authenticationController.js';
import walletController from '../controllers/walletController.js';
import profileController from '../controllers/editProfileController.js';
import bookController from '../controllers/bookController.js';
import emailMethod from '../controllers/emailController.js';
import multer from "multer";
import path from 'path' 
import appRoot from 'app-root-path';
const router = express.Router()

//router.Method('/routers', handler function)
//router.get('/', getHomePage) ;
//let upload = multer({ storage: imageStorage, fileFilter: imageFilter });
// let multipleUpload = upload.fields([{ name: 'bcover_pic'},{ name: 'pdf_book'}]);
const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        if (file.fieldname === 'bcover_pic') {
          cb(null, appRoot + "/public/Picture");
        } else if (file.fieldname === 'pdf_book') {
          cb(null, appRoot + "/public/Book_PDF");
        } else {
          cb(new Error('Invalid fieldname'));
        }
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
    }),
    fileFilter: function (req, file, cb) {
      if (file.fieldname === 'imageFile') {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
          req.fileValidationError = 'Only image files are allowed!';
          return cb(new Error('Only image files are allowed!'), false);
        }
      } else if (file.fieldname === 'pdfFile') {
        if (!file.originalname.match(/\.(pdf|PDF)$/)) {
          req.fileValidationError = 'Only PDF files are allowed!';
          return cb(new Error('Only PDF files are allowed!'), false);
        }
      }
      cb(null, true);
    }
  });
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
            const book = await bookController.getAllSellingBook(req, res);
            //console.log(book);
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
            const listOwnedBook = await bookController.getBookOwned(req, res);
            //console.log(listOwnedBook); 
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
            const listSellBook = await bookController.getBookSell(req, res);
            res.render('selling', {
                user: user,
                books: listSellBook
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
router.post('/uploadSelling', upload.fields([
    { name: 'bcover_pic', maxCount: 1 },
    { name: 'pdf_book', maxCount: 1 }
  ]), (req, res) => {
    // Handle the uploaded files
    const imageFile = req.files['bcover_pic'][0];
    const pdfFile = req.files['pdf_book'][0];
    // Process the files as needed
  
    res.send('Files uploaded successfully');
  });
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

router.get('/book/:id', async (req, res) => {
    let check = Object.keys(req.query);
    let isEmpty = check.every(key => !req.query[key]);
    if (req.session.username && isEmpty) {
        try {
            const book = await bookController.getBookInfo(req, res);
            const user = await authenController.getProfileUser(req, res);
            const selluser = await bookController.getUserSellingBook(req, res);
            //books = book;
            res.render('book', {
                user: user,
                books: book,
                selluser: selluser
            });
        } catch (error) {
            console.error(error);
        }
    } 
    else if (req.session.username && !isEmpty){
        await bookController.addToCart(req, res);
    }
    else {
        res.redirect('/login');
    }
    // console.log(">>> req.session.username = ", req.session.username);
});

router.get('/logout', authenController.logout);

export default router;
