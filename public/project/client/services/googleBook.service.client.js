'use strict';
(function() {
    angular
        .module("BookApp")
        .factory("GoogleBookService", GoogleBookService);

    function GoogleBookService($q, $http) {
        var service = {
            getBookDetails: getBookDetails,
            searchBookByTitle: searchBookByTitle,
            searchBookByAuthor: searchBookByAuthor,
            searchBookByGenre: searchBookByGenre
        };
        return service;

        function getBookDetails(bookId) {
            return $http.get("https://www.googleapis.com/books/v1/volumes/"+bookId);
        }

        function searchBookByTitle (bookname) {
            return $http.get("https://www.googleapis.com/books/v1/volumes?q="+bookname+"&");
        }

        function searchBookByAuthor (author) {
            return $http.get("https://www.googleapis.com/books/v1/volumes?q=inauthor:"+author);
        }

        function searchBookByGenre (genre) {
            return $http.get("https://www.googleapis.com/books/v1/volumes?q=subject:"+genre);
        }
    }
})();
