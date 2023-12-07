import { getUsername, updateProfile } from "../models/users.js"

const profileController = {};

profileController.getInfo = async (req, res) => {
    if (req.session.username) {
        try {
            const user = await getUsername(req.session.username);
            console.log(">>> user = ", user);
            res.render('editProfile', { user: user }); // Render the view with user data
        } catch (error) {
            console.error('Error getWalletInfo', error);
        }
    }
    else
        res.redirect('/login');
}
profileController.updateInfo = async (req, res) => {
    if (req.session.username == '') {
        res.redirect('/login');
    }
    let { email_edit, fullname_edit, phone_edit, birth_edit } = req.body;
    console.log(">>> email = ", email_edit, 'fullname = ', fullname_edit, 'phone = ', phone_edit, 'birth = ', birth_edit);
    try {
        await updateProfile(req.session.username, email_edit, fullname_edit, phone_edit, birth_edit);
        //req.flash('msg', 'Your information has been updated');
        res.redirect('/editProfile');
    } catch (error) {
        console.error('Error updateInfo', error);
    }
}
export default profileController;

//profileController.updateInfo = async (req, res) => {