'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("BomController",BomController);

    function BomController($scope, BooksOfMonthService, ReviewService, $routeParams, $rootScope, $sce) {

        var bookId = $routeParams.bookId;
        $scope.addReview = addReview;
        $scope.cancelReview = cancelReview;

        function init() {
            ReviewService.getReviewByBookId(bookId)
                .then(function(response) {
                    $scope.reviews = response.data;
                });

            BooksOfMonthService
                .getBOMById($routeParams.bookId)
                .then(
                    function(doc) {
                        $scope.book = doc.data;
                        $scope.description = $sce.trustAsHtml($scope.book.editorialDescription);
                    }
                );
        }
        init();

        function addReview (newReview) {
            newReview.username = $rootScope.user.username;
            newReview.googleBooksId = bookId;
            ReviewService.addCommentToBook(newReview)
                .then(
                    function (response) {
                        ReviewService.getReviewByBookId(bookId)
                            .then(function(response) {
                                $scope.reviews = response.data;
                            });
                        $scope.newReview = {};
                    }
                );
        }

        function cancelReview () {
            $scope.newReview = {};
        }
    }

})();