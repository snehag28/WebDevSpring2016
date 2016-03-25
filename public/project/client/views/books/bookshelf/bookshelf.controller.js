'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("BookshelfController",BookshelfController);

    function BookshelfController($scope, $rootScope, $location, BookService) {
        console.log("Hello from Bookshelf controller!");
        var vm = this;

        $scope.selectedBookIndex = null;
        $scope.updateBook = updateBook;
        $scope.deleteBook = deleteBook;
        $scope.selectBook = selectBook;

        function init() {
            if($location.url().indexOf('bookshelf') != -1){
                console.log("in all");
                getBooksForUser($rootScope.user._id);
            }
            else if($location.url().indexOf('current') != -1){
                console.log("in current");
                getBooksForUserByShelf($rootScope.user._id,"currently-reading");
            }
            else if($location.url().indexOf('read') != -1){
                console.log("in read");
                getBooksForUserByShelf($rootScope.user._id,"read");
            }
            else if($location.url().indexOf('future') != -1){
                console.log("in future");
                getBooksForUserByShelf($rootScope.user._id,"to-read");
            }

        }
        init();

        function getBooksForUser(userId){
            BookService.findAllBooksForUser(userId)
                .then(
                    function(doc) {
                        $scope.books = doc;
                    }
                )
        }

        function getBooksForUserByShelf(userId,shelf){
            BookService.findAllBooksForUserByShelf(userId,shelf)
                .then(
                    function(doc) {
                        $scope.books = doc;
                    }
                )
        }

        function updateBook (book){
            BookService.updateBookById($scope.books[$scope.selectedBookIndex].id, book)
                .then(
                    function(doc){
                        var updatedBook = doc;
                        $scope.books[$scope.selectedBookIndex] = updatedBook;
                        $scope.selectedBookIndex = null;
                        $scope.newBook = {};
                    }
                )
        }

        function deleteBook(index){
            BookService.deleteBookById($scope.books[index].id)
                .then(
                    function(doc){
                        $scope.books.splice(index,1);
                    }
                )
        }

        function selectBook(index){
            $scope.selectedBookIndex = index;
            $scope.newBook = {
                "id" : $scope.books[index].id,
                "title" : $scope.books[index].title,
                "userId" : $scope.books[index].userId,
                "authors" : $scope.books[index].authors,
                "shelf" : $scope.books[index].shelf,
                "rating" : $scope.books[index].rating,
                "imageURL" : $scope.books[index].imageURL,
            };
        }
    }
})();