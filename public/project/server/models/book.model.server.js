
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
        var deferred = q.defer();
        //Accepts parameters user id, book object, and shelf
        //Adds property called userId equal to user id parameter
        var newBook = {};
        var userObj = {userId: userId, shelf: shelf};

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
                        doc.userShelf.push(userObj);
                        doc.save(function(err, doc) {
                            if (err) {
                                console.log("err: "+err);
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc);
                            }
                        });
                    }
                    // book doesn't exist
                    else {
                        newBook.googleBooksId = book.id;
                        newBook.title = book.volumeInfo.title;
                        newBook.authors = book.volumeInfo.authors;
                        if(book.volumeInfo.imageLinks.thumbnail) {
                            newBook.imageURL = book.volumeInfo.imageLinks.thumbnail;
                        }
                        else if(book.volumeInfo.imageLinks[0]) {
                            newBook.imageURL = book.volumeInfo.imageLinks[0];
                        }
                        newBook.userShelf = [userObj];

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

    function findAllBooksForUser(userId) {
        var deferred = q.defer();

        BookModel.find(
            {'userShelf.userId': userId},
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
            {'userShelf.userId': userId,
                'userShelf.shelf': shelf},
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

    function findAndRemove(array, property, value) {
        array.forEach(function(result, index) {
            if(result[property] === value) {
                //Remove from array
                array.splice(index, 1);
            }
        });
        return array;
    }

    //deletes a user object from the books UserShelf
    function deleteBookById(bookId, userId) {
        var deferred = q.defer();

        var book = findBookById(bookId);
        var userShelf = book.userShelf;
        var newUserShelf = findAndRemove(userShelf, "userId", userId);

        BookModel.update(
            {googleBooksId: bookId},
            {$set: {userShelf: newUserShelf}},
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
        //console.log(newBook);
        BookModel.update (
            {_id: bookId},
            {$set: newBook},
            function (err, stats) {
                if(err) {
                    console.log("err: "+err);
                    deferred.reject(err);
                }
                else {
                    BookModel.findOne(
                        {_id: bookId},
                        function (err, book) {
                            if(err) {
                                console.log("err: "+err);
                                deferred.reject(err);
                            }
                            else {
                                //console.log("after update");
                                //console.log(book);
                                deferred.resolve(book);
                            }
                        });
                }
            });
        return deferred.promise;
    }
};