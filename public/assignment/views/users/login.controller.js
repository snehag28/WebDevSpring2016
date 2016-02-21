'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location,$rootScope,UserService){
        console.log("Hello from login controller!");

        function login(user){
            var userObj = UserService.findUserByUsernameAndPassword(user.username,user.password);
            if(userObj != null){
                $rootScope = userObj;
                $scope.$location = $location;
            }
        }
    }
})();