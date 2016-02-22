'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$location,$rootScope,UserService){
        console.log("Hello from register controller!");

        $scope.register = register;
        return register;

        function register(newUser){
            $rootScope.user = UserService.createUser(newUser);
            console.log($rootScope.user._id+", "+$rootScope.user.username+", "+$rootScope.user.email);
            $scope.$location = $location;
        }
    }
})();