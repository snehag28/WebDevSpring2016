'use strict';

(function (){
    angular
        .module("BookApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location,$rootScope,UserService){
        $scope.login = login;

        function login(user){
            UserService
                .login(user)
                .then(
                    function(doc){
                        if(doc.data){
                            UserService.setUser(doc.data);
                            $location.url("/profile");
                        }
                    },
                    function (err) {
                        if(err.data == "Unauthorized") {
                            $scope.error = "username/password does not exist";
                        }
                    }
                );
        }
    }
})();