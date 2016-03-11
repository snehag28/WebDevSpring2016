'use strict';
(function () {
    angular
        .module("BookApp")
        .controller("BookDetailsController", BookDetailsController);

    var DETAILS_URL = "https://www.googleapis.com/books/v1/volumes/BOOKID";

    angular
        .module("BookApp")
        .controller("BookDetailsController", BookDetailsController);

    function BookDetailsController($scope, $http, $routeParams) {
        console.log("in BookDetailsController: " + $routeParams.id);

        var vm = this;

        var bookId = $routeParams.id;
        console.log(bookId);

        function init() {
            console.log("in init: "+ bookId)
            selectBook(bookId);
        }
        init();

        function selectBook(bookId){
            console.log("in selectBook");
            var url = DETAILS_URL.replace("BOOKID", bookId);
            $http.get(url)
                .success(renderDetails);
        }

        function renderDetails(response) {
            //console.log(response);
            $scope.details = response;
        }
    }
})();