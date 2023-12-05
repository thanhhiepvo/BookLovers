import { insertUserAccount, getUsername, updateNewPassword } from "../models/users.js"
//import session from 'express-session';

const authenController = {};

// Sign Up
authenController.postCreateUser = async (req, res) => {
    console.log(">>> req.body = ", req.body);
    let { username, email, password, repassword } = req.body;  
    console.log(">>> username = ", username, 'email = ', email, 'password = ', password , 'repassword = ', repassword);
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
            req.flash('msg','Username does not exist');
            res.redirect('/login');  
        }
        else {
            if (user.pass == password) {
                //req.session.loggedIn = true;
                req.session.username = username;
                req.session.password = password;
                req.session.email = user.email;
                req.session.ballance =user.balance;
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
    let { username, new_password, confirm_password} = req.body;
    console.log(">>> username = ", username, 'new password = ', new_password, 'confirm password = ', confirm_password);

    const user = await getUsername(username);
    try {
        if (await user == null){
            req.flash('msg','Username does not exist');
            res.redirect('/forgotPass'); 
            //res.send('username is not exist'); 
        } else if (new_password != confirm_password){
            req.flash('msg','New Password and Confirm Password are not the same');
            res.redirect('/forgotPass');  
        } else {
            await updateNewPassword(username, new_password);
            req.flash('msg','Your password was changed!');
            res.redirect('/login')
        }
    } catch (error) {
        console.error('Error forgot password', error);
        res.status(500).send("Error forgot pass");
    }
}

export default authenController;
