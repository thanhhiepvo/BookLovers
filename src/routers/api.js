import express from 'express'
import momo from '../controllers/momo.js'
import multer from "multer";
import path from 'path';
import appRoot from 'app-root-path';
const router = express.Router();

router.get('/test', async (req, res, url) => {
    res.render('payment.ejs', { message: req.flash('msg') });
    await momo.createMomo(req, res);
    // console.log("+++++++++++++", url);
    // await momo.re(res);
})

export default router;
