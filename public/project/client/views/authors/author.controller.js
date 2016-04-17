'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("AuthorController",AuthorController);

    function AuthorController($scope, $rootScope, BookService,$routeParams, GoogleBookService) {

        $scope.searchBook = searchBook;
        $scope.renderBooks = renderBooks;

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

        function renderBooks(response){
            $scope.books = response.items;
        }
    }
})();