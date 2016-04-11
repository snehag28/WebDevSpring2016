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
                .login(user)
                .then(
                    function(doc){
                        if(doc){
                            UserService.setUser(doc.data);
                            $location.url("/profile");
                        }
                    },
                    function (err) {
                        if(err.data == "Unauthorized") {
                            vm.error = "username/password does not exist";
                        }
                    }
                )
        }
    }
})();