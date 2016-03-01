'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("SearchController",SearchController);

    function SearchController($scope, $rootScope, $location, $http) {
        console.log("Hello from search controller!");

        $scope.searchBook = searchBook;
        $scope.selectBook = selectBook;
        $scope.renderDetails = renderDetails;
        $scope.renderBooks = renderBooks;

        var $bookTitleTxt;
        var $searchBookBtn;
        var $tbody;
        var searchURL = "https://www.googleapis.com/books/v1/volumes?q=TITLE&";
        var DETAILS_URL = "https://www.googleapis.com/books/v1/volumes/BOOKID";


        function searchBook(bookname){
            console.log("in searchBook");
            var url = searchURL.replace("TITLE", bookname);
            $http.get(url)
                .success(renderBooks)
        }

        function selectBook(book){
            console.log("in selectBook");
            var url = DETAILS_URL.replace("BOOKID", book.id);
            $http.get(url)
                .success(renderDetails);
        }

        function renderDetails(response) {
            console.log("in renderDetails");
            console.log(response);
            $rootScope.details = response;
            $location.path('/bookDetails');
        }

        function renderBooks(response){
            $scope.books = response.items;
        }
    }

})();