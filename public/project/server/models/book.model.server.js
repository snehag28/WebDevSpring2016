
// load q promise library
var q = require("q");
var uuid = require('node-uuid');

module.exports = function(db, mongoose) {

    // load book schema
    var BookSchema = require("./book.schema.server.js")(mongoose);

    // create book model from schema
    var BookModel = mongoose.model('BookModel', BookSchema);

    var api = {
        createBook: createBook,
        deleteBookById: deleteBookById,
        findBookById: findBookById
    };
    return api;

    function createBook(book) {
        var deferred = q.defer();
        BookModel.findOne(
            {googleBooksId: book.id},
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    console.log("err: "+err);
                    deferred.reject(err);
                }
                else {
                    // if book already exists
                    if(doc) {
                        deferred.resolve(doc);
                    }
                    // book doesn't exist
                    else {
                        newBook.googleBooksId = book.id;
                        newBook.title = book.volumeInfo.title;
                        newBook.authors = book.volumeInfo.authors;
                        newBook.imageURL = book.volumeInfo.imageLinks.thumbnail;

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
                    }
                }
            });
        // return a promise
        return deferred.promise;
    }

    //function that returns book based on the ID
    function findBookById(bookId) {
        var deferred = q.defer();

        BookModel.findOne(
            {googleBooksId: bookId},
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

        // remove user with mongoose user model's remove()
        BookModel.remove(
            {googleBooksId: bookId},
            function(err, stats) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    //deferred.resolve(findAllUsers());
                    deferred.resolve(stats);
                }
            });
        return deferred.promise;
    }

    //function to remove an object from object array using its property name and property value
    function findAndRemove(array, property, value) {
        array.forEach(function(result, index) {
            if(result[property] === value) {
                //Remove from array
                array.splice(index, 1);
            }
        });
        return array;
    }
};