const sellingController = {};

sellingController.upLoadBook = async (req, res) => {
    let { nameBook, author, price, description, publishedYear, uploadImage, uploadPDF } = req.body;
    username = req.session.username;
}

export default sellingController;