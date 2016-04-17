'use strict';
(function() {
    angular
        .module("BookApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http, $rootScope, $q) {

        var api = {
            getReviewByBookId: getReviewByBookId,
            addCommentToBook: addCommentToBook
        };
        return api;

        function addCommentToBook (review) {
            return $http.post("/api/project/review", review);
        }

        function getReviewByBookId (bookId) {
            return $http.get("/api/project/review/"+bookId);
        }
    }
})();
