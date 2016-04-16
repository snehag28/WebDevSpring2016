'use strict';
(function() {
    angular
        .module("BookApp")
        .factory("BookService", BookService);

    function BookService($q,$http) {
        var service = {
            createBookForUser: createBookForUser,
            findAllBooksForUser: findAllBooksForUser,
            deleteBookById: deleteBookById,
            updateBookById: updateBookById,
            findAllBooksForUserByShelf: findAllBooksForUserByShelf,
            findBookById: findBookById
        };

        return service;

        function createBookForUser(userId, book, shelf) {
            var deferred = $q.defer();
            $http.post("/api/project/user/"+userId+"/"+shelf+"/book",book)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllBooksForUser(userId) {
            var deferred = $q.defer();
            $http.get("/api/project/user/"+userId+"/book")
                .then(
                    function(response){
                        deferred.resolve(response.data);
                    },
                    function(error){
                        deferred.reject(error);
                    }
                );
            return deferred.promise;
        }

        function findAllBooksForUserByShelf(userId, shelf) {
            console.log("in bookservice: "+shelf);
            var deferred = $q.defer();
            $http.get("/api/project/user/"+userId+"/"+shelf+"/book")
                .then(
                    function(response){
                        deferred.resolve(response.data);
                    },
                    function(error){
                        deferred.reject(error);
                    }
                );
            return deferred.promise;
        }

        function findBookById(bookId) {
            console.log("in findBookById");
            return $http.get("/api/project/book/"+bookId);
        }

        function deleteBookById(bookId) {
            var deferred = $q.defer();
            $http.delete("/api/project/book/"+bookId)
                .success(
                    function(response){
                        deferred.resolve(response);
                    }
                );
            return deferred.promise;
        }

        function updateBookById(bookId, newBook) {
            var deferred = $q.defer();
            $http.put("/api/project/book/"+bookId, newBook)
                .success(
                    function(response){
                        deferred.resolve(response);
                    }
                );
            return deferred.promise;
        }
    }
})();
