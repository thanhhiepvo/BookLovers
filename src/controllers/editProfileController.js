import { getUsername } from "../models/users.js"

const profileController = {};

profileController.getInfo = async (req, res) => {
    try {
        const user = await getUsername(req.session.username);
        console.log(">>> user = ", user);
        res.render('editProfile', { user: user }); // Render the view with user data
    } catch (error) {
        console.error('Error getWalletInfo', error);
    }
}
export default profileController;