import { addBook, addSellBook, delSellBook, checkBook, getBookInfo, getBookOwned, getBookSell, getShoppingCart, getUserSellingBook } from "../models/book.js";
import { getAllSellingBook, getInfoAllBook } from "../models/bookstore.js";
import { addToCart, removeFromCart, getTotalPrice } from "../models/users.js";
import authenController from "./authenticationController.js";
import { getSearchBook } from "../models/admin.js";

const bookController = {};

bookController.getAllBookInfo = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const book = await getInfoAllBook();
            resolve(book);
        } catch (error) {
            console.error('Error', error);
            reject(error);
        }
    });
}

bookController.getBookInfo = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const book = await getBookInfo(req.params['idbook']);
            resolve(book);
        } catch (error) {
            console.error('Error', error);
            reject(error);
        }
    });
}

bookController.getBookOwned = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ownedbookID = await getBookOwned(req.session.username) ?? [];
            let ownedbooklist = [];
            for (let bookid of ownedbookID) {
                let bookinfo = await getBookInfo(bookid);
                ownedbooklist.push(bookinfo);
            }
            resolve(ownedbooklist);
        } catch (error) {
            console.error('Error', error);
            reject(error);
        }
    });
}

bookController.getBookSell = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const usersellingbookID = await getBookSell(req.session.username) ?? [];
            let usersellingbooklist = [];
            for (let book of usersellingbookID) {
                let bookinfo = await getBookInfo(book.sbook);
                bookinfo.price = book.sprice;
                usersellingbooklist.push(bookinfo);
            }
            resolve(usersellingbooklist);
        } catch (error) {
            console.error('Error', error);
            reject(error);
        }
    });
}

bookController.getAllSellingBook = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sellingbook = await getAllSellingBook() ?? [];
            let sellingbooklist = [];
            for (let book of sellingbook) {
                let bookinfo = await getBookInfo(book.sbook);
                bookinfo.price = book.sprice;
                sellingbooklist.push(bookinfo);
            }
            resolve(sellingbooklist);
        } catch (error) {
            console.error('Error', error);
            reject(error);
        }
    });
}

bookController.getUserSellingBook = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const usersellingbook = await getUserSellingBook(req.params['idbook']) ?? [];
            resolve(usersellingbook);
        } catch (error) {
            console.error('Error', error);
            reject(error);
        }
    });
}

bookController.addToCart = async (req, res) => {
    // console.log(req.query);
    let data = req.query;
    await addToCart(data.ShopUser, data.ShopSeller, data.ShopBook);
}

bookController.removeFromCart = async (req, res) => {
    // console.log(req.body);
    let { ShopUser, ShopSeller, ShopBook } = req.body;
    await removeFromCart(ShopUser, ShopSeller, ShopBook);
    res.redirect('/cart');
}


bookController.getShoppingCart = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bookCart = await getShoppingCart(req.session.username) ?? [];
            resolve(bookCart);
        } catch (error) {
            console.error('Error', error);
            reject(error);
        }
    });
}

bookController.addUserSelling = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        const { nameBook, author, price, description, publishedYear } = req.body;
        let bookid = await checkBook(nameBook, author, publishedYear);
        let check = false;
        try {
            if (bookid == null) {
                bookid = await addBook(nameBook, author, description, publishedYear);
                check = true;
            }
            await addSellBook(req,req.session.username, bookid, price);
            resolve({ bookid, check });
        } catch (error) {
            console.error('Error', error);
            reject(error);
        }
    });
}

bookController.delSellBook = async (req, res) => {
    // console.log(req.body);
    let { SBook } = req.body;
    await delSellBook(req,req.session.username, SBook);
    res.redirect('/selling');
}

bookController.getTotalPrice = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const total_price = await getTotalPrice(req.session.username);
            resolve(total_price);
        } catch (error) {
            console.error('Error', error);
            reject(error);
        }
    });
}

bookController.getSearchBook = async (req, res) => {
    try {
        const searchbookID = await getSearchBook(req.body.searchquery) ?? [];
        let booklist = [];
        for (let bookid of searchbookID) {
            let bookinfo = await getBookInfo(bookid);
            booklist.push(bookinfo);
        }
        const user = await authenController.getProfileUser(req, res);
        const cart = await bookController.getShoppingCart(req, res);
        res.render('search', {
            user: user,
            books: booklist,
            nItems_in_cart: cart.length
        });
    } catch (error) {
        console.error('Error', error);
    }
}

export default bookController;