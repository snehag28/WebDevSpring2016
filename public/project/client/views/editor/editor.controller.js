'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("EditorController",EditorController);

    function EditorController($scope, ArticleService, $sce) {
        $scope.isOneSelected = null;
        function init() {
            ArticleService
                .getAllEditorials()
                .then(
                    function(doc) {
                        $scope.editorials = doc.data;
                        for( var i = 0; i < $scope.editorials.length ; i++) {
                            if($scope.editorials[i].publish == true){
                                $scope.isOneSelected = true;
                            }
                        }
                        if($scope.isOneSelected == null){
                            $scope.isOneSelected = false;
                        }
                    }
                );
        }
        init();

        $scope.deleteArticle = deleteArticle;
        $scope.unselectArticle = unselectArticle;
        $scope.selectArticle = selectArticle;

        $scope.$on('$locationChangeStart', function( event ) {
            if($scope.isOneSelected == false){
                $scope.error = "Editorial not selected";
                event.preventDefault();
            }
        });

        function unselectArticle (id, editorial) {
            editorial.publish = false;
            ArticleService.
                updateArticle(id,editorial)
                .then(
                    function(response) {
                        ArticleService
                            .getAllEditorials()
                            .then(
                                function(doc) {
                                    $scope.editorials = doc.data;
                                    $scope.isOneSelected = false;
                                }
                            );
                    }
                );
        }

        function selectArticle (id, editorial) {
            editorial.publish = true;
            ArticleService.
                updateArticle(id,editorial)
                .then(
                    function(response) {
                        ArticleService
                            .getAllEditorials()
                            .then(
                                function(doc) {
                                    $scope.editorials = doc.data;
                                    $scope.isOneSelected = true;
                                }
                            );
                    }
                );
        }

        function deleteArticle(id, publishBool) {
            if(publishBool == true) {
                $scope.isOneSelected = false;
            }
            ArticleService.deleteArticle(id)
                .then(
                    function(response) {
                        ArticleService
                            .getAllEditorials()
                            .then(
                                function(doc) {
                                    $scope.editorials = doc.data;
                                }
                            );
                    }
                );
        }
    }

})();