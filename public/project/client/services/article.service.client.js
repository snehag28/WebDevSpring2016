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
            updateArticle: updateArticle
        };
        return api;

        function getEditorial () {
            return $http.get("/api/project/editor/article");
        }

        function getArticleById(id) {
            return $http.get("/api/project/editor/"+id);
        }

        function addArticle(article) {
            console.log(article);
            return $http.post("/api/project/article",article);
        }

        function updateArticle(id,article) {
            return $http.put("/api/project/article/"+id, article);
        }
    }
})();