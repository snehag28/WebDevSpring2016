'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("AuthorController",AuthorController);

    function AuthorController($scope, $rootScope,$location, $http, BookService,$routeParams) {
        console.log("Hello from search controller!");

        $scope.searchBook = searchBook;
        //$scope.selectBook = selectBook;
        //$scope.renderDetails = renderDetails;
        $scope.renderBooks = renderBooks;
        $scope.addToReadingList = addToReadingList;

        var $bookTitleTxt;
        var $searchBookBtn;
        var $tbody;
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
        /*
        function selectBook(book){
            console.log("in selectBook");
            var url = DETAILS_URL.replace("BOOKID", book.id);
            $http.get(url)
                .success(renderDetails);
        }
        */

        function addToReadingList(book,shelf){
            BookService.createBookForUser($rootScope.user._id,book,shelf,
                function(response){
                    var newBook = response;
                    $scope.books.push(newBook);
                    $scope.selectedBookIndex = null;
                    $scope.newBook = {};
                }
            )
        }
        /*
        function renderDetails(response) {
            console.log("in renderDetails");
            console.log(response);
            $rootScope.details = response;
            $location.path('/bookDetails');
        }
        */
        function renderBooks(response){
            $scope.books = response.items;
        }
    }
})();