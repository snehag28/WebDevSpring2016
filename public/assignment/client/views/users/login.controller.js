'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location,UserService){
        console.log("Hello from login controller!");
        var vm = this;
        $scope.login = login;

        function login(user){
            UserService
                .findUserByCredentials(user.username,user.password)
                .then(function(response){
                    vm.user = response.data;
                    console.log(vm.user);
                    if(vm.user){
                        UserService.setCurrentUser(vm.user);
                        $location.url("/profile");
                    }

                });
        }
    };
})();