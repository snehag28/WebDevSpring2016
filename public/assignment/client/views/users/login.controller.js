'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location,UserService){
        //console.log("Hello from login controller!");
        var vm = this;
        $scope.login = login;

        function login(user){
            UserService
                .findUserByCredentials(user.username,user.password)
                .then(
                    function(doc){
                        vm.user = doc;
                        if(vm.user){
                            UserService.setUser(vm.user);
                            $location.url("/profile");
                        }
                    }
                )
        }
    };
})();