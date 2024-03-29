import "dotenv/config"
import nodemailer from 'nodemailer';
import { getUserEmail } from '../models/users.js';

const emailController = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        accessToken: process.env.OAUTH_ACCESS_TOKEN,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

function generateOTP() {

    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

let curOTP = generateOTP();
const emailMethod = {};

emailMethod.checkOTP = async (req, res) => {
    // console.log(">>> req.body = ", req.body);
    let { num1, num2, num3, num4 } = req.body;
    let stringotp = num1 + num2 + num3 + num4;
    try {
        if (stringotp != curOTP) {
            console.log('Wrong OTP entered');
            req.flash('msg', 'OTP is not correct');
            res.redirect('/otp');
        }
        else {
            req.session.OTPcheck = true;
            console.log('OTP valid');
            res.redirect('/recoverPass');
        }
    }
    catch (error) {
        console.error('Error while checking OTP', error);
        res.status(500).send("OTP check error");
    }
}

emailMethod.sendOTP = async (req, res) => {
    // console.log(">>> req.body = ", req.body);
	let { unameforgot } = req.body;
	try {
        const useremail = await getUserEmail(unameforgot);
        if (useremail == null) {
            req.flash('msg', 'Invalid username');
            res.redirect('/forgotPass');
        }
        else {
            req.session.email = useremail;
            req.session.OTPcheck = false;
            const mailOptions = {
                from: process.env.MAIL_USERNAME,
                to: `${useremail}`, //tự nhập email đi bạn
                subject: '[BookLovers] OTP',
                text: `Your OTP is ${curOTP}. Use this OTP to reset your password`
            };
    
            emailController.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log("Error " + err);
                } else {
                    console.log("Email sent successfully");
                }
            });

            res.redirect('/otp');
        }
	}
	catch (error) {
		console.error('Error while sending OTP to email', error);
		res.status(500).send("OTP email sending error");
	}
}

emailMethod.resendOTP = async (req, res) => {
    if (req.session.email){
        curOTP = generateOTP();
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: `${req.session.email}`, //tự nhập email đi bạn
            subject: '[BookLovers] OTP',
            text: `Your OTP is ${curOTP}. Use this OTP to reset your password`
        };
        emailController.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log("Email sent successfully");
            }
        });
        res.redirect('/otp');
    }
    else res.redirect('/login');
}

export default emailMethod