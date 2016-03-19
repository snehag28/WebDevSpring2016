'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($rootScope,$scope,$location,UserService){
        //console.log("Hello from login controller!");
        $scope.login = login;

        function login(user){
            UserService
                .findUserByCredentials(user.username,user.password)
                .then(
                    function(doc){
                        var user = doc;
                        if(user){
                            UserService.setUser(user);
                            $location.url("/profile");
                        }
                    }
                )
        }
    };
})();