'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("AuthorController",AuthorController);

    function AuthorController($scope, $rootScope, $http, BookService,$routeParams) {

        $scope.searchBook = searchBook;
        $scope.renderBooks = renderBooks;
        $scope.addToReadingList = addToReadingList;

        var $bookTitleTxt;
        var $searchBookBtn;
        var searchURL = "https://www.googleapis.com/books/v1/volumes?q=inauthor:AUTHOR";
        var DETAILS_URL = "https://www.googleapis.com/books/v1/volumes/BOOKID";


        function init() {
            var author = $routeParams.authorName;
            if(author) {
                searchBook(author);
            }
        }
        init();

        function searchBook(author){
            console.log("in searchBook");
            var url = searchURL.replace("AUTHOR", author);
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