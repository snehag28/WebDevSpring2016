'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$location,$rootScope,UserService){
        console.log("Hello from register controller!");
        $scope.$location = $location;

        $scope.register = register;
        return register;

        function register(newUser){
            $rootScope = UserService.createUser(newUser);
        }
    }
})();