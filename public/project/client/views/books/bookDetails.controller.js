'use strict';
(function () {
    angular
        .module("BookApp")
        .controller("BookDetailsController", BookDetailsController);

    var DETAILS_URL = "https://www.googleapis.com/books/v1/volumes/BOOKID";

    angular
        .module("BookApp")
        .controller("BookDetailsController", BookDetailsController);

    function BookDetailsController($scope, $http, $routeParams,$sce,BookService, $rootScope) {
        $scope.addToReadingList = addToReadingList;

        var vm = this;

        var bookId = $routeParams.id;
        console.log(bookId);

        function init() {
            selectBook(bookId);
        }
        init();

        function selectBook(bookId){
            var url = DETAILS_URL.replace("BOOKID", bookId);
            $http.get(url)
                .success(renderDetails);
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

        function renderDetails(response) {
            $scope.details = response;
            $scope.description = $sce.trustAsHtml($scope.details.volumeInfo.description);
        }
    }
})();