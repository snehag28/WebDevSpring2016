'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$location,$rootScope,UserService){
        console.log("Hello from register controller!");

        $scope.register = function(user){
            UserService.createUser(newUser,
                function(response){
                    $rootScope.user = response;
                    console.log($rootScope.user._id+", "+$rootScope.user.username+", "+$rootScope.user.email);
                }
            )
        }
        $scope.$location = $location;
    };
})();