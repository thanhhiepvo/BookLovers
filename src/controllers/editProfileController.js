import { getUsername } from "../models/users.js"

const profileController = {};

// get information to print on the site editProfile
profileController.getInfo = async (req, res) => {
    try {
        const user = await getUsername(req.session.username);
        console.log(">>> user = ", user);
        res.render('editProfile', { user: user }); // Render the view with user data
    } catch (error) {
        console.error('Error getWalletInfo', error);
    }
}

// update new information from editProfile
profileController.editInfo = async (req, res) => {
    let { email_edit, fullname_edit, phone_edit, birth_edit } = req.body;
}

export default profileController;