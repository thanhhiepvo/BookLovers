import { getUsername } from "../models/users.js"
import { getID_OwnedBooks} from "../models/ownedbook.js"
import { getOwnedBookInfo} from "../models/book.js"

const myBooksController = {};

myBooksController.getMyBooksInfo = async (req, res) => {
    try {
        const user = await getUsername(req.session.username);
        //console.log(">>> user = ", user);
        res.render('myBook', { user: user }); // Render the view with user data
    } catch (error) {
        console.error('Error getMyBooksInfo', error);
    }
}

myBooksController.getMyBooks = async (req, res) => {
    try {
        const listID_OwnedBooks = await getID_OwnedBooks(req.session.username);
        const listOwnedBook = await getOwnedBookInfo(listID_OwnedBooks);
        res.render('myBook', { listOwnedBook: listOwnedBook});
    } catch (error) {
        
    }
}

export default myBooksController;