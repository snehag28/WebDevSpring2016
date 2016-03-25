'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("SearchController",SearchController);

    function SearchController($scope, $rootScope, $http, BookService,$routeParams) {
        //console.log("Hello from search controller!");

        $scope.searchBook = searchBook;
        $scope.renderBooks = renderBooks;
        $scope.addToReadingList = addToReadingList;

        var $bookTitleTxt;
        var $searchBookBtn;
        var searchURL = "https://www.googleapis.com/books/v1/volumes?q=TITLE&";
        var DETAILS_URL = "https://www.googleapis.com/books/v1/volumes/BOOKID";

        function init() {
            //console.log("in init:" + $routeParams.title);
            var bookname = $routeParams.title;
            if(bookname) {
                searchBook(bookname);
            }
        }
        init();

        function searchBook(bookname){
            //console.log("in searchBook");
            var url = searchURL.replace("TITLE", bookname);
            $http.get(url)
                .success(renderBooks)
        }

        function addToReadingList(book,shelf){
            BookService.createBookForUser($rootScope.user._id,book,shelf)
                .then(
                    function(response){
                        var newBook = response;
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