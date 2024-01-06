import { getUsername } from "../models/users.js"

const walletController = {};

walletController.getWalletInfo = async (req, res) => {
    try {
        const user = await getUsername(req.session.username);
        console.log(">>> user = ", user);
        res.render('wallet', { user: user }); // Render the view with user data
    } catch (error) {
        console.error('Error getWalletInfo', error);
    }
}

walletController.checkout = async (req, res) => {
    try {

    } catch (error) {
        console.log
    }
}

export default walletController;