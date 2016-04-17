'use strict';

(function (){
    angular
        .module("BookApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$location,$rootScope,UserService){
        $scope.register = register;

        function register(newUser){
            UserService
                .createUser(newUser)
                .then(
                    function (doc) {
                        var currentUser = doc.data;
                        if( currentUser != null){
                            UserService.setUser(currentUser);
                            $location.url('/profile');
                        }
                    }
                );
        }
    }
})();