import { getBookInfo } from "../models/book.js";
import { getInfoAllBook } from "../models/bookstore.js";

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
    // console.log("ashdsahd", req.param('id'));
    return new Promise(async (resolve, reject) => {
        try {
            const book = await getBookInfo( req.param('id'));
            req.book = book;
            console.log(book);
            resolve(book);
        } catch (error) {
            console.error('Error', error);
            reject(error);
        }
    });
}

export default bookController;