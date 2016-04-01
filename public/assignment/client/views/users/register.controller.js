'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($location,UserService){
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
                            $location.url('/profile');
                        }
                    }
                );
        }
    }
})();