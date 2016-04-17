'use strict';
(function () {
    angular
        .module("BookApp")
        .controller("SubmitEditorialController", SubmitEditorialController);

    function SubmitEditorialController($scope, $routeParams, ArticleService,$location, $rootScope) {

        $scope.submitArticle = submitArticle;


        function init() {
            $scope.updateFlag = false;
            if($routeParams.id) {
                $scope.updateFlag = true;
                ArticleService.
                getArticleById($routeParams.id)
                    .then(
                        function(response) {
                            $scope.article = response.data;
                        }
                    );
            }
        }
        init();

        function submitArticle(newArticle) {
            if($scope.updateFlag == true) {
                ArticleService.
                updateArticle($routeParams.id,newArticle)
                    .then(
                        function(response) {
                            $location.path("/opinion");
                        }
                    );
            }
            else {
                newArticle.read = true;
                newArticle.type = 'editor';
                newArticle.publish = false;
                newArticle.username = $rootScope.user.username;
                newArticle.imageURL = "";
                ArticleService.
                    addArticle(newArticle)
                    .then(
                        function(response) {
                            $location.path("/opinion");
                        }
                    );
            }
        }
    }
})();