'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("SearchController",SearchController);

    function SearchController($scope, $rootScope, BookService,$routeParams, GoogleBookService) {
        $scope.searchBook = searchBook;
        $scope.renderBooks = renderBooks;
        $scope.addToReadingList = addToReadingList;

        function init() {
            var bookname = $routeParams.title;
            if(bookname) {
                searchBook(bookname);
            }
        }
        init();

        function searchBook(bookname){
            GoogleBookService.searchBookByTitle(bookname)
                .success(renderBooks);

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