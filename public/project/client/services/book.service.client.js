'use strict';
(function() {
    angular
        .module("BookApp")
        .factory("BookService", BookService);

    function BookService() {

        var books = [
            {"id": "ENiOZNc6OBUC", "title": "The Loop", "authors": ["Nicholas Evans"],
                "imageURL":"http://books.google.com/books/content?id=ENiOZNc6OBUC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70snoJIoRl37OL9wAjnyeLROjjbh7j0vOMkaVenQVDJH2iM4SW34SDjX8jSscYZmk9dPznyqMjCaWKakBKFoBE8RJNr9vEHPPdUjGUHYFGGivOkPH85lRPA_JQVfAnfZ4hsRmRA&source=gbs_api",
               "shelf":"read", "rating": "4", "userId": 123},
            {"id": "IIaHUnvGr2gC", "title": "The Sicilian", "authors": ["Mario Puzo"],
                "imageURL":"http://books.google.com/books/content?id=IIaHUnvGr2gC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71ESdoQ4JyS5whDzKKTIWq9pj_dXI9V1_P3Gn4pdcDC3prk8Nke8YiiFNqcedBjXbvdk3-kECICNJ6ZnYf50ydFE_gVtILfISdfuskVxi7sKIuphveqWVD7ZVq3YG4qzGcta4jp&source=gbs_api",
                "shelf":"currently-reading", "rating": "", "userId": 123},
            {"id": "jfGh87zvPi8C", "title": "Monsoon", "authors": ["Wilbur Smith"],
                "imageURL":"http://books.google.com/books/content?id=jfGh87zvPi8C&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73x_xsLkzpPVt5AGW-IyfcTs7XrZ3Mn6yGbWLkqalOahcrIHuwa3h1RXL6jX5T_eJWuOeR4mF44TEuLiWl6c75zylPwoY3obycl1aADGwL-T6cJPRe9-zBWCxM6UJe50iLWAlUl&source=gbs_api",
                "shelf":"to-read", "rating": "", "userId": 123},
        ];



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
