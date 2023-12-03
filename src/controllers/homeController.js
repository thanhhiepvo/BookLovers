import { insertUserAccount,getUsername } from "../models/users.js"

export const getHomePage = (req, res) => {
    res.send('Check out our homepage') // send text
}

export const postCreateUser = async (req, res) => {
    let { username, email, password ,repassword } = req.body;   
    console.log(">>> username = ", username, 'email = ', email, 'password = ', password , 'repassword = ', repassword);
    try {
        if (await getUsername(username) != null) {
            res.send('Username already exists')
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

export const loginUser = async (req, res) => { 
    let { username, password } = req.body;
    console.log(">>> username = ", username, 'password = ', password);
    const user = await getUsername(username);
    try {
        if (await user == null) {
            res.send('Username does not exist')
        }
        else {
            if (user.pass == password) {
                req.flash('msg', 'You are now logged in');
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
