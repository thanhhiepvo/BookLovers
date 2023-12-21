import { getBookInfo, getBookOwned, getBookSell } from "../models/book.js";
import { getInfoAllBook, getAllSellingBook } from "../models/bookstore.js";
import multer from "multer";
const bookController = {};

bookController.getBookInfo = async (req, res) => {
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
            const sellingbookID = await getAllSellingBook() ?? [];
            // console.log(sellingbookID);
            let sellingbooklist = [];
            for (let book of sellingbookID) {
                let bookinfo = await getBookInfo(book.sbook);
                bookinfo.price = book.sprice;
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

bookController.upLoadBook = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }
};

export default bookController;