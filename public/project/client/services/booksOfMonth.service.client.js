'use strict';
(function() {
    angular
        .module("BookApp")
        .factory("BooksOfMonthService", BooksOfMonthService);

    function BooksOfMonthService($http) {

        var api = {
            getBooksOfMonth: getBooksOfMonth,
            getBOMById: getBOMById,
            addArticle: addArticle,
            updateArticle: updateArticle,
            getAllEditorials: getAllEditorials,
            deleteArticle: deleteArticle
        };
        return api;

        function deleteArticle(id) {
            return $http.delete("/api/project/article/"+id);
        }

        function getAllEditorials() {
            return $http.get("/api/project/editor");
        }

        function getBooksOfMonth () {
            return $http.get("/api/project/booksOfMonth");
        }

        function getBOMById(id) {
            return $http.get("/api/project/booksOfMonth?bookId="+id);
        }

        function addArticle(article) {
            return $http.post("/api/project/article",article);
        }

        function updateArticle(id,article) {
            return $http.put("/api/project/article/"+id, article);
        }
    }
})();