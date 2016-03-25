var books = require("./book.mock.json");
var uuid = require('node-uuid');

module.exports = function() {
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

        //Adds new book to local array of books
        books.push(newBook);
        console.log(books);
        //Calls back with new book

        return newBook;
    }

    function findAllBooksForUser(userId) {
        //Accepts parameter user id
        //Iterates over the array of current books looking for books whose user id is parameter user id
        console.log("in findAllBooksForUser:"+userId);
        var booksForUser = [];
        for (var index in books) {
            var book = books[index];
            if (book.userId == userId) {
                booksForUser.push(book);
            }
        }
        return booksForUser;
    }

    function findAllBooksForUserByShelf(userId, shelf) {
        //Accepts parameter user id and shelf
        //Iterates over the array of current books looking for books whose user id is parameter user id
        console.log("in findAllBooksForUser:"+userId+":"+shelf);
        var booksForUser = [];
        for (var index in books) {
            var book = books[index];
            if (book.userId == userId && book.shelf == shelf) {
                booksForUser.push(book);
            }
        }
        console.log(booksForUser);
        return booksForUser;
    }

    //function that returns book based on the ID
    function findBookById(bookId) {
        for (var index in books) {
            var book = books[index];
            if (bookId == book.id) {
                return book;
            }
        }
        return null;
    }

    function deleteBookById(bookId) {
        //Accepts parameter book id
        //Iterates over array of books looking for book whose id is book id parameter
        var book = findBookById(bookId);
        //If found, removes book from current array of books
        if (book != null) {
            var index = books.indexOf(book);
            books.splice(index, 1);
        }
        return books;
    }

    function updateBookById(bookId, newBook) {
        console.log("in updateBookById:" + newBook)
        //Accepts parameter book id, new book object
        //Iterates over array of books looking for book whose id is book id parameter
        var book = findBookById(bookId);
        //If found, updates book object with new book values
        if (book != null) {
            console.log("in if");
            book.rating = newBook.rating;
            book.shelf = newBook.shelf;
        }
        console.log(book);
        return book;
    }
}