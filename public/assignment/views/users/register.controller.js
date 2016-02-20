'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$location,UserService){
        console.log("Hello from register controller!");
        $scope.$location = $location;

        $scope.register = register;

        function register(newUser){
            UserService.createUser(newUser);
        }
    }
})();