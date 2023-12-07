require('dotenv').config();
const nodemailer = require('nodemailer');

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
	console.log(">>> req.body = ", req.body);
	let { num1, num2, num3, num4 } = req.body;
	let stringotp = num1 + num2 + num3 + num4;
	try {
		if (stringotp != curOTP) {
			req.flash('msg', 'OTP is not correct');
			res.redirect('/otp');
		}
		else {
			res.redirect('/forgotPass');
		}
	}
	catch (error) {
		console.error('Wrong OTP entered', error);
		res.status(500).send("Error wrong OTP");
	}
}

module.exports = {
	emailController: emailController,
	curOTP: curOTP,
	emailMethod: emailMethod,
};