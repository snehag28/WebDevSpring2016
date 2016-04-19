'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("SearchController",SearchController);

    function SearchController($scope, $rootScope, BookService,$routeParams, GoogleBookService) {
        $scope.searchBook = searchBook;
        $scope.renderBooks = renderBooks;

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

        function renderBooks(response){
            $scope.books = response.items;
            if($scope.books) {
                $scope.noBooks = false;
            }
            else {
                $scope.noBooks = true;
            }
        }
    }

})();