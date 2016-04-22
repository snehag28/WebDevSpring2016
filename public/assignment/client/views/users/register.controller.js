'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($location,UserService,$rootScope){
        var vm = this;
        vm.register = register;

        function register(newUser){
            UserService
                .createUser(newUser)
                .then(
                    function (doc) {
                        var currentUser = doc.data;
                        if( currentUser != null){
                            UserService.setUser(currentUser);
                            //console.log($rootScope.user);
                            $location.url('/profile');
                        }
                    }
                );
        }
    }
})();