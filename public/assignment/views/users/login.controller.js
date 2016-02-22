'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location,$rootScope,UserService){
        console.log("Hello from login controller!");

        $scope.login = login;
        return login;

        function login(user){
            var userObj = UserService.findUserByCredentials(user.username,user.password);
            if(userObj != null){
                $rootScope.user = userObj;
                $scope.$location = $location;
            }
        }
    }
})();