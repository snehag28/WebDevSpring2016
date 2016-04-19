'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("OpinionController",OpinionController);

    function OpinionController($scope, ArticleService, BooksOfMonthService, $sce, $rootScope) {
        function init() {
            ArticleService
                .getEditorial()
                .then(
                    function(doc) {
                        $scope.editorial = doc.data;
                        $scope.title = $sce.trustAsHtml($scope.editorial.title);
                        $scope.content = $sce.trustAsHtml($scope.editorial.content);
                    }
                );
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
        init();
    }

})();