'use strict';
(function() {
    angular
        .module("BookApp")
        .factory("ArticleService", ArticleService);

    function ArticleService($http) {

        var api = {
            getEditorial: getEditorial,
            getArticleById: getArticleById,
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

        function getEditorial () {
            return $http.get("/api/project/editor/article");
        }

        function getArticleById(id) {
            return $http.get("/api/project/editor/"+id);
        }

        function addArticle(article) {
            return $http.post("/api/project/article",article);
        }

        function updateArticle(id,article) {
            return $http.put("/api/project/article/"+id, article);
        }
    }
})();