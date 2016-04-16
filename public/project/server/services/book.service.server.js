//var bookModel = require("./../models/book.model.server.js")();

module.exports = function(app, bookModel, shelfModel) {
    app.get("/api/project/user/:userId/book",getBooksForUser);
    app.get("/api/project/user/:userId/:shelf/book",getBooksForUserByShelf);
    app.get("/api/project/book/:bookId", getBookById);
    app.post("/api/project/user/:userId/:shelf/book",createBookForUser);
    app.put("/api/project/book/:bookId", updateBook);
    app.delete("/api/project/book/:bookId",deleteBook);

    function getBooksForUser (req, res) {
        console.log("in getBooksForUser");
        shelfModel.findAllBooksForUser(req.params.userId)
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
        shelfModel.findAllBooksForUserByShelf(userId,shelf)
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

    function createBookForUser(req, res) {
        //console.log("in createBookForUser");
        var book = req.body;
        var userId = req.params.userId;
        var shelf = req.params.shelf;
        //console.log(book.id);
        bookModel.createBook(book)
            .then(
                function (doc) {
                    //console.log("result of finBookById");
                    //console.log(doc);
                    // add to user shelf
                    shelfModel.createShelf(userId,doc,shelf)
                        .then(
                            function (newShelf) {
                                res.json(newShelf);
                            },
                            // send error if promise rejected
                            function ( err ) {
                                res.status(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getBookById (req, res) {
        console.log("getBookById");
        bookModel.findBookById(req.params.bookId)
            .then(
                function ( book ) {
                    res.json(book);
                },
                // send error if promise rejected
                function ( err ) {
                    console.log(err);
                    res.status(400).send(err);
                }
            );
    }

    function updateBook (req, res) {
        var newBook = req.body;
        bookModel.updateBookById(req.params.bookId, newBook)
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
};
