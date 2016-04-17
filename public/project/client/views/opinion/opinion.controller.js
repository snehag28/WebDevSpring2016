'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("OpinionController",OpinionController);

    function OpinionController($scope, ArticleService, $sce) {
        function init() {
            ArticleService
                .getEditorial()
                .then(
                    function(doc) {
                        $scope.editorial = doc.data;
                        $scope.title = $sce.trustAsHtml($scope.editorial.title);
                        $scope.content = $sce.trustAsHtml($scope.editorial.content);
                    }
                );
        }
        init();
    }

})();