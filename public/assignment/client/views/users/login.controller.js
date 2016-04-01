'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($location,UserService){
        var vm = this;
        vm.login = login;

        function login(user){
            UserService
                .findUserByCredentials(user.username,user.password)
                .then(
                    function(doc){
                        if(doc){
                            UserService.setUser(doc);
                            $location.url("/profile");
                        }
                    }
                )
        }
    };
})();