'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("PeopleController",PeopleController);

    function PeopleController($scope, UserService) {
        $scope.user = UserService.getUser();
    }

})();