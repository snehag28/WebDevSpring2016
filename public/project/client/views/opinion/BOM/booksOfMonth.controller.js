'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("BooksOfMonthController",BooksOfMonthController);

    function BooksOfMonthController($scope, BooksOfMonthService, $rootScope) {

        function init() {
            if($rootScope.booksOfMonth) {
                var books = $rootScope.booksOfMonth;
                $scope.book1 = books[0];
                $scope.book2 = books[1];
                $scope.book3 = books[2];
            }
            else {
                BooksOfMonthService
                    .getBooksOfMonth()
                    .then(
                        function(doc) {
                            $scope.book1 = doc.data[0];
                            $scope.book2 = doc.data[1];
                            $scope.book3 = doc.data[2];
                            $rootScope.booksOfMonth = doc.data;
                        }
                    );
            }
        }
        init();
    }

})();