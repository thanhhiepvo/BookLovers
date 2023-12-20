import { getBookInfo, getBookOwned } from "../models/book.js";
import { getInfoAllBook, getAllSellingBook } from "../models/bookstore.js";

const bookController = {};

bookController.getInfoBook = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const book = await getInfoAllBook();
            req.book = book;
            resolve(book);
        } catch (error) {
            console.error('Error', error);
            reject(error);
        }
    });
}


bookController.getInfoOneBook = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const book = await getBookInfo(req.param('id'));
            console.log(book);
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

bookController.getAllSellingBook = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sellingbookID = await getAllSellingBook() ?? [];
            // console.log(sellingbookID);
            let sellingbooklist = [];
            for (let bookid of sellingbookID) {
                // console.log(bookid);
                let bookinfo = await getBookInfo(bookid.sbook);
                bookinfo.price = bookid.sprice;
                sellingbooklist.push(bookinfo);
            }
            // console.log(sellingbooklist);
            resolve(sellingbooklist);
        } catch (error) {
            console.error('Error', error);
            reject(error);
        }
    });
}

export default bookController;