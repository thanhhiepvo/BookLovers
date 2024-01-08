import { getUsername } from "../models/users.js"
import { checkout } from "../models/admin.js"

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
        req.flash('msg', {message :'Cart is empty. Cannot make payment', status: 'error'});
        res.redirect('/cart');
    }
    else {    
        try {
            const state = await checkout(req.session.username, req.body.total_price);
            if (state) {
                console.log('Payment completed successfully');
                req.flash('msg', {message :'Payment completed successfully', status: 'success'});
                res.redirect('/mybook');
            }
            else {
                console.log('User doesn\'t have enough money. Please deposit into your balance !!')
                req.flash('msg', {message :'User doesn\'t have enough money. Please deposit into your balance !!', status: 'error'});
                res.redirect('/cart');
            }
        } catch (error) {
            console.error('Error checkout', error);
        }
    }
}

export default walletController;