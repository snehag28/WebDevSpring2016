'use strict';

(function (){
    angular
        .module("BookApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location,$rootScope,UserService){
        $scope.login = login;

        function login(user){
            console.log("in controller login");
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
                            vm.error = "username/password does not exist";
                        }
                    }
                );
        }
    }
})();