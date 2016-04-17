'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("EditorController",EditorController);

    function EditorController($scope, $location, $rootScope) {
        $scope.submitArticle = submitArticle;

        function submitArticle(article){
            $location.path('/opinion');
        }
    }

})();