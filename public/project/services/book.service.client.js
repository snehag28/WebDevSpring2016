'use strict';
(function() {
    angular
        .module("BookApp")
        .factory("BookService", BookService);

    function BookService() {

        /*var books = [
            {"_id": "000", "title": "Godfather", "authors": ["Mario Puzo"], "imageURL":"",
               "shelf":"read", "rating": "4", "userId": 123},
            {"_id": "010", "title": "Sicilian", "authors": ["Mario Puzo"], "imageURL":"",
                "shelf":"currently-reading", "rating": "", "userId": 123},
            {"_id": "020", "title": "Memoirs of a Geisha", "authors": ["Arthur Golden"], "imageURL":"",
                "shelf":"read", "rating": "4","userId": 234},
            {"_id": "030", "title": "Monsoon", "authors": ["Wilbur Smith"], "imageURL":"",
                "shelf":"to-read", "rating": "", "userId": 123},
        ];*/

        var books = [];

        var service = {
            createBookForUser: createBookForUser,
            findAllBooksForUser: findAllBooksForUser,
            deleteBookById: deleteBookById,
            updateBookById: updateBookById,
            findAllBooksForUserByShelf: findAllBooksForUserByShelf
        };

        return service;

        function createBookForUser(userId, book, shelf, callback) {
            //Accepts parameters user id, book object, and callback function
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
            if (typeof callback == "function") {
                callback(newBook);
            }
        }

        function findAllBooksForUser(userId, callback) {
            //Accepts parameter user id, and callback function
            //Iterates over the array of current books looking for books whose user id is parameter user id
            console.log("in findAllBooksForUser:"+userId);
            var booksForUser = [];
            for (var index in books) {
                var book = books[index];
                if (book.userId == userId) {
                    booksForUser.push(book);
                }
            }
            //Calls back with found books for user id parameter, empty array otherwise
            if (typeof callback == "function") {
                callback(booksForUser);
            }
        }

        function findAllBooksForUserByShelf(userId, shelf, callback) {
            //Accepts parameter user id, and callback function
            //Iterates over the array of current books looking for books whose user id is parameter user id
            console.log("in findAllBooksForUser:"+userId);
            var booksForUser = [];
            for (var index in books) {
                var book = books[index];
                if (book.userId == userId && book.shelf == shelf) {
                    booksForUser.push(book);
                }
            }
            //Calls back with found books for user id parameter, empty array otherwise
            if (typeof callback == "function") {
                callback(booksForUser);
            }
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

        function deleteBookById(bookId, callback) {
            //Accepts parameter book id and callback function
            //Iterates over array of books looking for book whose id is book id parameter
            var book = findBookById(bookId);
            //If found, removes book from current array of books
            if (book != null) {
                var index = books.indexOf(book);
                books.splice(index, 1);
            }
            //Calls back with remaining array of books
            if (typeof callback == "function") {
                callback(books);
            }
        }

        function updateBookById(bookId, newBook, callback) {
            console.log("in updateBookById:" + newBook)
            //Accepts parameter book id, new book object, and callback function
            //Iterates over array of books looking for book whose id is book id parameter
            var book = findBookById(bookId);
            //If found, updates book object with new book values
            if (book != null) {
                console.log("in if");
                book.rating = newBook.rating;
                book.shelf = newBook.shelf;
            }
            console.log(book);
            //Calls back with update book
            if (typeof callback == "function") {
                callback(book);
            }
        }
    }
})();
