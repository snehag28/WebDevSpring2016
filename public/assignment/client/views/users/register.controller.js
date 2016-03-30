'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$location,UserService){
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