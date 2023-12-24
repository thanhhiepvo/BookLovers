import { getBookInfo, getBookOwned, getBookSell, getUserSellingBook } from "../models/book.js";
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

bookController.upLoadBook = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }
};

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

export default bookController;