import { getInfoAllBook } from "../models/books.js";

const bookController = {};

bookController.getInfoBook = async (req, res) => {
    try {
        const book = await getInfoAllBook();
        //console.log(">>> book = ", book);
        //res.render('homepage', { book: book }); // Render the view with user data
        // res.render('home', { books: book });
        res.render('home', { username: req.session.username, email: req.session.email, ballance: req.session.ballance, books: book}); 
        console.log("bookkk", book[0]);
        // return book;
    } catch (error) {
        console.error('Error getWalletInfo', error);
    }
}

export default bookController;