'use strict';

(function (){
    angular
        .module("BookApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$location,$rootScope,UserService){
        //console.log("Hello from register controller!");
        $scope.register = register;

        function register(newUser){
            UserService
                .createUser(newUser)
                .then(
                    function (doc) {
                        UserService.setUser(doc);
                        console.log(doc);
                        $location.url('/profile');
                    }
                )
        }
    };
})();