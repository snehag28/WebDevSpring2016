'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location,$rootScope,UserService){
        //console.log("Hello from login controller!");
        $scope.login = login;

        function login(user){
            UserService.findUserByCredentials(user.username,user.password,
                function(response){
                    $rootScope.user = response;
                    //console.log($rootScope.user._id+", "+$rootScope.user.username+", "+$rootScope.user.email);
                }
            )
        }
        $scope.$location = $location;
    };
})();