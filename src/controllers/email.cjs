require('dotenv').config();
const nodemailer = require('nodemailer');

// Tạo một transporter với các tùy chọn (thay đổi dựa trên máy chủ email của bạn)
let transporter = nodemailer.createTransport({
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

// Thiết lập nội dung email
let mailOptions = {
  from: "tangphong333@gmail.com",
  to: "thanhhiepvos@gmail.com",
  subject: 'Nodemailer Project',
  text: 'Hi from your nodemailer project'
};

// Gửi email
transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log("Email sent successfully");
  }
});
