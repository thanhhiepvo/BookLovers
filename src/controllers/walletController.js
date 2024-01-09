import { getUsername, buyOneBook } from "../models/users.js"
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

walletController.buyOneBook = async (req, res) => {
    let { bSeller, bBookID, bPrice } = req.body;
    try {
        const state = await buyOneBook(req.session.username, bSeller, bBookID, -bPrice);
        if (state == -1){
            console.log('User already owned this book. Can not buy')
            req.flash('msg', { message: 'User already owned this book. Can not buy', status: 'error' });
            res.redirect('/book/' + bBookID);
        }
        else if (state == 1){
            console.log('User doesn\'t have enough money. Please deposit into your balance !!')
            req.flash('msg', { message: 'User doesn\'t have enough money. Please deposit into your balance !!', status: 'error' });
            res.redirect('/book/' + bBookID);
        }
        else if (state == 0){
            console.log('Payment completed successfully');
            req.flash('msg', { message: 'Payment completed successfully', status: 'success' });
            res.redirect('/mybook');
        }
    } catch (error) {
        console.error('Error buyOneBook', error);
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