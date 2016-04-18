'use strict';
(function() {
    angular
        .module("BookApp")
        .factory("BooksOfMonthService", BooksOfMonthService);

    function BooksOfMonthService($http) {

        var api = {
            getBooksOfMonth: getBooksOfMonth,
            getAllBOMS: getAllBOMS,
            getBOMById: getBOMById,
            addToBOM: addToBOM,
            updateBOM: updateBOM,
            deleteBOM: deleteBOM
        };
        return api;

        function deleteBOM(id) {
            return $http.delete("/api/project/booksOfMonth/"+id);
        }

        function getBooksOfMonth () {
            return $http.get("/api/project/booksOfMonth");
        }

        function getAllBOMS () {
            return $http.get("/api/project/booksOfMonth/books");
        }

        function getBOMById(id) {
            return $http.get("/api/project/booksOfMonth?bookId="+id);
        }

        function addToBOM(bom) {
            return $http.post("/api/project/booksOfMonth",bom);
        }

        function updateBOM(id,book) {
            return $http.put("/api/project/booksOfMonth/"+id, book);
        }
    }
})();