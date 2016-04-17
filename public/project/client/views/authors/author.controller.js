'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("AuthorController",AuthorController);

    function AuthorController($scope, $rootScope, BookService,$routeParams, GoogleBookService) {

        $scope.searchBook = searchBook;
        $scope.renderBooks = renderBooks;
        $scope.addToReadingList = addToReadingList;

        function init() {
            var author = $routeParams.authorName;
            if(author) {
                searchBook(author);
            }
        }
        init();

        function searchBook(author){
            GoogleBookService.searchBookByAuthor(author)
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