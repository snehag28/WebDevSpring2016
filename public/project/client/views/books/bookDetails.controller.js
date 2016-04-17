'use strict';
(function () {
    angular
        .module("BookApp")
        .controller("BookDetailsController", BookDetailsController);

    function BookDetailsController($scope, $routeParams, $sce, BookService, $rootScope, ReviewService, GoogleBookService) {
        $scope.addToReadingList = addToReadingList;
        $scope.addReview = addReview;
        $scope.cancelReview = cancelReview;

        var vm = this;

        var bookId = $routeParams.id;
        console.log(bookId);

        function init() {
            selectBook(bookId);
            ReviewService.getReviewByBookId(bookId)
                .then(function(response) {
                    $scope.reviews = response.data;
                });
        }
        init();

        function selectBook(bookId){
            GoogleBookService.getBookDetails(bookId)
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
                );
        }

        function renderDetails(response) {
            $scope.details = response;
            $scope.description = $sce.trustAsHtml($scope.details.volumeInfo.description);
        }

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