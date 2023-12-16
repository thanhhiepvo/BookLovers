import { insertUserAccount, getUsername, updateNewPassword } from "../models/users.js"
//import session from 'express-session';

const authenController = {};

// Sign Up
authenController.postCreateUser = async (req, res) => {
    console.log(">>> req.body = ", req.body);
    let { username, email, password, repassword } = req.body;
    console.log(">>> username = ", username, 'email = ', email, 'password = ', password, 'repassword = ', repassword);
    try {
        if (await getUsername(username) != null) {
            req.flash('msg', 'Username already exists');
            res.redirect('/signUp');
        }
        else if (password != repassword) {
            req.flash('msg', 'Password does not match');
            res.redirect('/signUp');
        }
        else {
            await insertUserAccount(username, email, password);
            req.flash('msg', 'You are now registered. Please log in');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).send("Error creating user");
    }
}

// Login
authenController.loginUser = async (req, res) => {
    let { username, password } = req.body;
    console.log(">>> username = ", username, 'password = ', password);

    const user = await getUsername(username);
    try {
        if (await user == null) {
            //res.send('Username does not exist')
            req.flash('msg', 'Username does not exist');
            res.redirect('/login');
        }
        else {
            if (user.pass == password) {
                //req.session.loggedIn = true;
                req.session.username = username;
                req.session.password = password;
                req.session.email = user.email;
                req.session.ballance = user.balance;
                res.redirect('/homepage');
            }
            else {
                req.flash('msg', 'Password incorrect');
                res.redirect('/login');
            }
            // document.getElementById("mess").textContent = msg;
        }
    } catch (error) {
        console.error('Error login', error);
        res.status(500).send("Error login");
    }
}

// Forgot Password
authenController.forgotPassword = async (req, res) => {
    let { new_password, confirm_password } = req.body;
    console.log(">>> new password = ", new_password, "confirm password = ", confirm_password);

    try {
        if (!req.session.OTPcheck) {
            console.log('Skipped OTP input step');
            req.flash('msg', 'You can\'t skip OTP input');
            res.redirect('/recoverPass');
        } else if (new_password != confirm_password) {
            req.flash('msg', 'New Password and Confirm Password are not the same');
            res.redirect('/recoverPass');
        } else {
            await updateNewPassword(req.session.email, new_password);
            req.flash('msg', 'Your password was changed!');
            //req.session.destroy();
            res.redirect('/login')
        }
    } catch (error) {
        console.error('Error forgot password', error);
        res.status(500).send("Error forgot pass");
    }
}

authenController.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}

authenController.getProfileUser = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getUsername(req.session.username);
            req.user = user;
            resolve(user);
        } catch (error) {
            console.error('Error getProfileUser', error);
            reject(error);
        }
    });
}
export default authenController;
