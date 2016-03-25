var bookModel = require("./../models/book.model.js")();

module.exports = function(app) {
    app.get("/api/project/user/:userId/book",getBooksForUser);
    app.get("/api/project/user/:userId/:shelf/book",getBooksForUserByShelf);
    app.get("/api/project/book/:bookId", getBookById);
    app.post("/api/project/user/:userId/:shelf/book",createBookForUser);
    app.put("/api/project/book/:bookId", updateBook);
    app.delete("/api/project/book/:bookId",deleteBook);

    function getBooksForUser (req, res) {
        var userId = req.params.userId;
        var books = bookModel.findAllBooksForUser(userId);
        res.json(books);
    }

    function getBooksForUserByShelf (req, res) {
        var userId = req.params.userId;
        var shelf = req.params.shelf;
        var books = bookModel.findAllBooksForUserByShelf(userId,shelf);
        console.log(books);
        res.json(books);
    }

    function createBookForUser(req, res){
        var newBook = req.body;
        var userId = req.params.userId;
        var shelf = req.params.shelf;
        var book = bookModel.createBookForUser(userId,newBook,shelf);
        res.json(book);
    }

    function getBookById (req, res) {
        var book = bookModel.findBookById(req.params.bookId);
        res.json(book);
    }

    function updateBook (req, res) {
        var newBook = req.body;
        var book = bookModel.updateBookById(req.params.bookId, newBook);
        res.json(book);
    }

    function deleteBook (req, res) {
        var books = bookModel.deleteBookById(req.params.bookId);
        res.json(books);
    }
}
