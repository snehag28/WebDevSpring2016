'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("BookshelfController",BookshelfController);

    function BookshelfController($scope, $rootScope, $location, BookService) {
        console.log("Hello from Bookshelf controller!");

        $scope.selectedBookIndex = null;
        $scope.updateBook = updateBook;
        $scope.deleteBook = deleteBook;
        $scope.selectBook = selectBook;

        function init() {
            if($location.url().indexOf('bookshelf') != -1){
                getBooksForUser($rootScope.user._id);
            }
            else if($location.url().indexOf('current') != -1){
                getBooksForUserByShelf($rootScope.user._id,"currently-reading");
            }
            else if($location.url().indexOf('read') != -1){
                getBooksForUserByShelf($rootScope.user._id,"read");
            }
            else if($location.url().indexOf('future') != -1){
                getBooksForUserByShelf($rootScope.user._id,"to-read");
            }

        }
        init();

        function getBooksForUser(userId){
            BookService.findAllBooksForUser(userId,
                function(response){
                    var userBooks = response;
                    $scope.books = userBooks;
                    console.log("in getBooksForUser:"+$scope.books);
                }
            )
        };

        function getBooksForUserByShelf(userId,shelf){
            BookService.findAllBooksForUserByShelf(userId,shelf,
                function(response){
                    var userBooks = response;
                    $scope.books = userBooks;
                    console.log("in getBooksForUser:"+$scope.books);
                }
            )
        };

        function updateBook (book){
            console.log("in updteBook:" + book);
            BookService.updateBookById($scope.books[$scope.selectedBookIndex]._id, book,
                function(response){
                    var updatedBook = response;
                    $scope.books[$scope.selectedBookIndex] = updatedBook;
                    $scope.selectedBookIndex = null;
                    $scope.newBook = {};
                }
            )
        };
        function deleteBook(index){
            BookService.deleteBookById($scope.books[index]._id,
                function(response){
                    $scope.books.splice(index,1);
                })
        };

        function selectBook(index){
            $scope.selectedBookIndex = index;
            $scope.newBook = {
                "_id" : $scope.books[index]._id,
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