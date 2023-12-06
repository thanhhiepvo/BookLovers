import { getInfoAllBook } from "../models/books.js";

const bookController = {};

bookController.getInfoBook = async (req, res) => {
    try {
        const book = await getInfoAllBook();
        //console.log(">>> book = ", book);
        //res.render('homepage', { book: book }); // Render the view with user data
        res.render('home', { book: book });
    } catch (error) {
        console.error('Error getWalletInfo', error);
    }
}

export default bookController;