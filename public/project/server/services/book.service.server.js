//var bookModel = require("./../models/book.model.server.js")();

module.exports = function(app, bookModel) {
    app.get("/api/project/user/:userId/book",getBooksForUser);
    app.get("/api/project/user/:userId/:shelf/book",getBooksForUserByShelf);
    app.get("/api/project/book/:bookId", getBookById);
    app.post("/api/project/user/:userId/:shelf/book",createBookForUser);
    app.put("/api/project/book/:bookId", updateBook);
    app.delete("/api/project/book/:bookId",deleteBook);

    function getBooksForUser (req, res) {
        bookModel.findAllBooksForUser(req.params.userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getBooksForUserByShelf (req, res) {
        var userId = req.params.userId;
        var shelf = req.params.shelf;
        bookModel.findAllBooksForUserByShelf(userId,shelf)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createBookForUser(req, res){
        var newBook = req.body;
        var userId = req.params.userId;
        var shelf = req.params.shelf;
        bookModel.createBookForUser(userId,newBook,shelf)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getBookById (req, res) {
        bookModel.findBookById(req.params.bookId)
            .then(
                function ( book ) {
                    res.json(book);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateBook (req, res) {
        var newBook = req.body;
        var book = bookModel.updateBookById(req.params.bookId, newBook)
            .then(
                function ( book ) {
                    res.json(book);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );

    }

    function deleteBook (req, res) {
        bookModel.deleteBookById(req.params.bookId)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }
}
