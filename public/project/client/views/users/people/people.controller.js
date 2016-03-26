'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("PeopleController",PeopleController);

    function PeopleController($scope, UserService) {
        console.log("Hello from People controller!");
        $scope.user = UserService.getUser();
    }

})();