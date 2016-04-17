'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("FeaturettesController",FeaturettesController);

    function FeaturettesController($scope,ArticleService,$sce) {
        function init() {
            ArticleService
                .getEditorial()
                .then(
                    function(doc) {
                        $scope.editorial = doc.data;
                        $scope.title = $sce.trustAsHtml($scope.editorial.title);
                    }
                );
        }
        init();
    }

})();