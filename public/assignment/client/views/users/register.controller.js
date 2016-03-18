'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$location,$rootScope,UserService){
        console.log("Hello from register controller!");
        var vm = this;
        $scope.register = register;

        function register(newUser){
            UserService
                .createUser(newUser)
                .then(
                    function (doc) {
                        vm.user = doc;
                        console.log("registered user:");
                        console.log(vm.user);
                        UserService.setUser(vm.user);
                        $location.path('/profile');
                    }
                )
        }
    };
})();