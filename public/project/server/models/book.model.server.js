
// load q promise library
var q = require("q");
var uuid = require('node-uuid');

module.exports = function(db, mongoose) {

    // load book schema
    var BookSchema = require("./book.schema.server.js")(mongoose);

    // create book model from schema
    var BookModel = mongoose.model('BookModel', BookSchema);

    var api = {
        createBookForUser: createBookForUser,
        findAllBooksForUser: findAllBooksForUser,
        deleteBookById: deleteBookById,
        updateBookById: updateBookById,
        findAllBooksForUserByShelf: findAllBooksForUserByShelf,
        findBookById: findBookById
    };
    return api;

    function createBookForUser(userId, book, shelf) {
        //Accepts parameters user id, book object, and shelf
        //Adds property called userId equal to user id parameter
        var newBook = {};

        newBook.userId = userId;
        newBook.shelf = shelf;
        newBook.title = book.volumeInfo.title;
        newBook.authors = book.volumeInfo.authors;
        newBook.imageURL = book.volumeInfo.imageLinks.thumbnail;
        newBook.id = book.id;

        var deferred = q.defer();

        BookModel.create(newBook, function (err, doc) {
            if (err) {
                // reject promise if error
                console.log("err: "+err);
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function findAllBooksForUser(userId) {
        var deferred = q.defer();

        BookModel.find(
            {userId: userId},
            function (err, doc) {
                if (err) {
                    // reject promise if error
                    console.log("err: "+err);
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function findAllBooksForUserByShelf(userId, shelf) {
        //Accepts parameter user id and shelf
        //Iterates over the array of current books looking for books whose user id is parameter user id

        var deferred = q.defer();

        // find users with mongoose user model's find()
        BookModel.find(
            {userId: userId},
            {shelf: shelf},
            function (err, doc) {
                if (err) {
                    // reject promise if error
                    console.log("err: "+err);
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    //function that returns book based on the ID
    function findBookById(bookId) {
        var deferred = q.defer();

        BookModel.findOne(
            {id: bookId},
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    console.log("err: "+err);
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function deleteBookById(bookId) {
        var deferred = q.defer();

        BookModel.remove(
            {id: bookId},
            function(err, stats) {

                if (err) {
                    // reject promise if error
                    console.log("err: "+err);
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(stats);
                }
            });
        return deferred.promise;
    }

    function updateBookById(bookId, newBook) {
        var deferred = q.defer();

        BookModel.update (
            {id: bookId},
            {$set: newBook},
            function (err, stats) {
                if(err) {
                    console.log("err: "+err);
                    deferred.reject(err);
                }
                else {
                    BookModel.findOne(
                        {id: bookId},
                        function (err, book) {
                            if(err) {
                                console.log("err: "+err);
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(book);
                            }
                        });
                }
            });
        return deferred.promise;
    }
}