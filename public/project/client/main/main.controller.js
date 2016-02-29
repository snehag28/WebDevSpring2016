'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("MainController", MainController);

    function MainController($scope,$location) {
        $scope.$location = $location;
    }
})();