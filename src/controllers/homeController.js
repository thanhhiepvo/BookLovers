import { insertUserAccount } from "../models/users.js"

export const getHomePage = (req, res) => {
    res.send('Check out our homepage') // send text
}

export const postCreateUser = async (req, res) => {
    let { email, password, username } = req.body;
    console.log(">>> username = ", username, 'email = ', email, 'password = ', password);
    try {
        await insertUserAccount(username, email, password);
        res.send("Create user successfully")
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).send("Error creating user");
    }
}

// module.exports = {
//     getHomePage
// }