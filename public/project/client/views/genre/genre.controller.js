'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("GenreController",GenreController);

    function GenreController($scope, $rootScope, $http, BookService, $routeParams) {
        console.log("Hello from search controller!");

        $scope.searchBook = searchBook;
        $scope.renderBooks = renderBooks;
        $scope.addToReadingList = addToReadingList;

        var $bookTitleTxt;
        var $searchBookBtn;
        var searchURL = "https://www.googleapis.com/books/v1/volumes?q=subject:CATEGORY";
        var DETAILS_URL = "https://www.googleapis.com/books/v1/volumes/BOOKID";

        function init() {
            var genre = $routeParams.genreName;
            if(genre) {
                searchBook(genre);
            }
        }
        init();

        function searchBook(genre){
            console.log("in searchBook");
            var url = searchURL.replace("CATEGORY", genre);
            $http.get(url)
                .success(renderBooks)
        }

        function addToReadingList(book,shelf){
            BookService.createBookForUser($rootScope.user._id,book,shelf)
                .then(
                    function(response){
                        var newBook = response;
                        $scope.books.push(newBook);
                        $scope.selectedBookIndex = null;
                        $scope.newBook = {};
                    }
                )
        }

        function renderBooks(response){
            $scope.books = response.items;
        }
    }
})();