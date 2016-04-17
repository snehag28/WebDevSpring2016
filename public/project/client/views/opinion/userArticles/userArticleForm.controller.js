'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("UserArticlerFormController",UserArticlerFormController);

    function UserArticlerFormController($scope, $location, $rootScope) {
        $scope.submitArticle = submitArticle;

        function submitArticle(article,userID){
            $location.path('/userArticles');
        }
    }

})();