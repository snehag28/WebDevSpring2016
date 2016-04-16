'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("BookshelfController",BookshelfController);

    function BookshelfController($scope, $rootScope, $location, BookService) {
        //var vm = this;

        $scope.selectedBookIndex = null;
        $scope.updateBook = updateBook;
        $scope.deleteBook = deleteBook;
        $scope.selectBook = selectBook;

        var userId = $rootScope.user._id;
        var shelf;

        function init() {
            if($location.url().indexOf('bookshelf') != -1){
                console.log("in all");
                shelf = "all";
                getBooksForUser($rootScope.user._id);
            }
            else if($location.url().indexOf('current') != -1){
                console.log("in current");
                shelf = "currently-reading";
                getBooksForUserByShelf(userId,shelf);
            }
            else if($location.url().indexOf('read') != -1){
                console.log("in read");
                shelf = "read";
                getBooksForUserByShelf(userId,shelf);
            }
            else if($location.url().indexOf('future') != -1){
                console.log("in future");
                shelf = "to-read";
                getBooksForUserByShelf(userId,shelf);
            }
        }
        init();

        function getBooksForUser(userId){
            BookService.findAllBooksForUser(userId)
                .then(
                    function(doc) {
                        $scope.books = doc;
                        for(var i = 0, len = $scope.books.length; i < len; i++ ) {
                            var userIndex = arrayObjectIndexOf($scope.books[i].userShelf, userId, "userId");
                            var userShelf = {};
                            if(userIndex != -1){
                                userShelf = $scope.books[i].userShelf[userIndex];
                            }
                            $scope.books[i].currentUserShelf = userShelf;
                        }
                    }
                );
        }

        function getBooksForUserByShelf(userId,shelf){
            BookService.findAllBooksForUserByShelf(userId,shelf)
                .then(
                    function(doc) {
                        $scope.books = doc;
                        for(var i = 0, len = $scope.books.length; i < len; i++ ) {
                            var userIndex = arrayObjectIndexOf($scope.books[i].userShelf, userId, "userId");
                            var currUserShelf = {};
                            if(userIndex != -1){
                                currUserShelf = $scope.books[i].userShelf[userIndex];
                            }
                            $scope.books[i].currentUserShelf = currUserShelf;
                        }
                    }
                );
        }

        function updateBook (book) {
            console.log("in update");
            console.log(book.userShelf);
            var userIndex = arrayObjectIndexOf(book.userShelf, userId, "userId");
            var newBook = {};
            newBook.userShelf = book.userShelf;
            newBook.userShelf[userIndex] = book.currentUserShelf;
            //$scope.books[$scope.selectedBookIndex].userShelf[userIndex] = book.currentUserShelf;
            //delete book.currentUserShelf;
            BookService.updateBookById($scope.books[$scope.selectedBookIndex]._id, newBook)
                .then(
                    function(doc){
                        var updatedBook = doc;
                        $scope.books[$scope.selectedBookIndex] = updatedBook;
                        var userIndex = arrayObjectIndexOf($scope.books[$scope.selectedBookIndex].userShelf, userId, "userId");
                        var userShelf = {};
                        if(userIndex != -1){
                            userShelf = $scope.books[$scope.selectedBookIndex].userShelf[userIndex];
                        }
                        $scope.books[$scope.selectedBookIndex].currentUserShelf = userShelf;
                        $scope.selectedBookIndex = null;
                        $scope.newBook = {};
                    }
                );
        }

        function deleteBook(index){
            var userIndex = arrayObjectIndexOf($scope.books[index].userShelf, userId, "userId");
            $scope.books[index].userShelf.splice(userIndex,1);
            $scope.selectedBookIndex = index;

            var newBook = {
                "userShelf" : $scope.books[index].userShelf
            };
            BookService.updateBookById($scope.books[$scope.selectedBookIndex]._id, newBook)
                .then(
                    function(doc){
                        if(shelf == "all"){
                            getBooksForUser(userId);
                        }
                        else {
                            getBooksForUserByShelf(userId,shelf);
                        }

                    }
                )
        }

        function selectBook(index){
            $scope.selectedBookIndex = index;

            $scope.newBook = {
                "title" : $scope.books[index].title,
                "authors" : $scope.books[index].authors,
                "currentUserShelf": $scope.books[index].currentUserShelf,
                "imageURL" : $scope.books[index].imageURL,
                "userShelf" : $scope.books[index].userShelf
            };
        }

        function arrayObjectIndexOf(myArray, searchTerm, property) {
            for(var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i][property] === searchTerm) return i;
            }
            return -1;
        }

    }
})();