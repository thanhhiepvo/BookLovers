import { getInfoAllBook } from "../models/books.js";

const bookController = {};

bookController.getInfoBook = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const book = await getInfoAllBook();
            req.book = book;
            resolve(book);
        } catch (error) {
            console.error('Error getWalletInfo', error);
            reject(error);
        }
    });
}

export default bookController;