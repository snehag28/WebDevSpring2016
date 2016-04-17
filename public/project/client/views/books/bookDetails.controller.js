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

        function init() {
            selectBook(bookId);
            ReviewService.getReviewByBookId(bookId)
                .then(function(response) {
                    $scope.reviews = response.data;
                });

            if($rootScope.user) {
                BookService.getBookById(bookId)
                    .then(function(response) {
                        if(response.data){
                            $scope.book = response.data;
                            var shelves = $scope.book.userShelf;
                            for( var i=0 ; i < shelves.length ; i++) {
                                if(shelves[i].userId == $rootScope.user._id) {
                                    $scope.usershelf = shelves[i].shelf;
                                }
                            }
                        }
                    });
            }
        }
        init();

        function selectBook(bookId){
            GoogleBookService.getBookDetails(bookId)
                .success(renderDetails);
        }

        function addToReadingList(newBook,shelf){
            if($scope.usershelf) {
                // if usershelf is set, we update the book with new selected shelf value
                var userIndex = arrayObjectIndexOf($scope.book.userShelf, $rootScope.user._id, "userId");
                var newBook = {};
                newBook.userShelf = $scope.book.userShelf;
                var currentShelf = {
                    shelf: shelf,
                    userId: $rootScope.user._id,
                    _id: $scope.book.userShelf[userIndex]._id};
                newBook.userShelf[userIndex] = currentShelf;
                BookService.updateBookById($scope.book._id, newBook)
                    .then(
                        function(doc){
                            $scope.book = doc;
                            var userIndex = arrayObjectIndexOf($scope.book.userShelf, $rootScope.user._id, "userId");
                            var currentShelf = {};
                            if(userIndex != -1){
                                currentShelf = $scope.book.userShelf[userIndex];
                            }
                            $scope.usershelf = currentShelf.shelf;
                        }
                    );
            }
            else {
                BookService.createBookForUser($rootScope.user._id,newBook,shelf)
                    .then(
                        function(response){
                            $scope.selectedBookIndex = null;
                            $scope.newBook = {};
                        }
                    );
            }
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

        function arrayObjectIndexOf(myArray, searchTerm, property) {
            for(var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i][property] === searchTerm) return i;
            }
            return -1;
        }
    }
})();