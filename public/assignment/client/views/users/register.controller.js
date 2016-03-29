'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$location,UserService){
        var vm = this;
        $scope.register = register;

        function register(newUser){
            UserService
                .createUser(newUser)
                .then(
                    function (doc) {
                        vm.user = doc;
                        UserService.setUser(vm.user);
                        $location.path('/profile');
                    }
                )
        }
    };
})();