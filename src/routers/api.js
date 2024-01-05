import express from 'express'
import momo from '../controllers/momo.js'
import multer from "multer";
import path from 'path';
import appRoot from 'app-root-path';
const router = express.Router();



router.get('/test', (req, res) => {
    res.render('payment.ejs', { message: req.flash('msg') });
    // momo.createMomo(req, res);
})

router.post('/a', momo.createMomo);

export default router;
