'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("GenreController",GenreController);

    function GenreController($scope, $rootScope, BookService, $routeParams) {
        $scope.searchBook = searchBook;
        $scope.renderBooks = renderBooks;
        $scope.addToReadingList = addToReadingList;

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