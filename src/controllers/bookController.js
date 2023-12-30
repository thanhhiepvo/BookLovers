import { addBook, addSellBook, checkBook, getBookInfo, getBookOwned, getBookSell, getShoppingCart, getUserSellingBook } from "../models/book.js";
import { getAllSellingBook, getInfoAllBook } from "../models/bookstore.js";
import { addToCart } from "../models/users.js";
import multer from "multer";
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
    console.log(req.query);
    let data = req.query;
    await addToCart(data.ShopUser, data.ShopSeller, data.ShopBook);
    res.redirect('/homepage');
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
            await addSellBook(req.session.username, bookid, price);
            resolve({bookid, check});
        } catch (error) {
            console.error('Error', error);
            reject(error);
        }
    });
}

export default bookController;