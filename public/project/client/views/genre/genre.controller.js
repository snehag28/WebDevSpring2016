'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("GenreController",GenreController);

    function GenreController($scope, $rootScope, BookService, $routeParams, GoogleBookService) {
        $scope.searchBook = searchBook;
        $scope.renderBooks = renderBooks;

        function init() {
            var genre = $routeParams.genreName;
            if(genre) {
                searchBook(genre);
            }
        }
        init();

        function searchBook(genre){
            GoogleBookService.searchBookByGenre(genre)
                .success(renderBooks)
        }

        function renderBooks(response){
            $scope.books = response.items;
        }
    }
})();