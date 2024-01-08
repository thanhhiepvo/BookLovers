import { getUsername } from "../models/users.js"
import { checkout } from "../models/admin.js"
import { getUserInvoiceInfo } from "../models/invoice.js";

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
    // console.log(req.body);
    if (req.body.total_price == 0){
        console.log("Cart is empty. Cannot make payment");
        return "Cart is empty. Cannot make payment";
    }
    else {    
        try {
            const state = await checkout(req.session.username, req.body.total_price);
            if (state) {
                console.log('Payment completed successfully');
                res.redirect('/mybook');
            }
            else {
                console.log('User doesn\'t have enough money. Please deposit into your balance !!')
                res.redirect('/cart');
            }
        } catch (error) {
            console.error('Error checkout', error);
        }
    }
}

walletController.getUserInvoiceInfo = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const invoice = await getUserInvoiceInfo(req.session.username);
            resolve(invoice);
        } catch (error) {
            console.error('Error', error);
            reject(error);
        }
    });
}

export default walletController;