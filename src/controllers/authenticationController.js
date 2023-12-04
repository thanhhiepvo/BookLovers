import { insertUserAccount, getUsername } from "../models/users.js"
//import session from 'express-session';

const authenController = {};
authenController.postCreateUser = async (req, res) => {
    let { username, email, password ,repassword } = req.body;   
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

export default authenController;