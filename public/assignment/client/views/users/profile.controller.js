'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,$routeParams,$rootScope, UserService) {
        //console.log("Hello from profile controller!");
        $scope.update = update;

        function update(newUser) {
            UserService.updateUser(newUser._id, newUser,
                function (response) {
                    $rootScope.user = response;
                    console.log($rootScope.user._id + ", " + $rootScope.user.firstName + ", " + $rootScope.user.lastName);
                }
            )
        };

        /*var vm = this;

        var username = $routeParams.username;
        console.log(username);

        function init() {
            UserService
                .findUserById($rootScope.user._id)
                .then(function (response) {
                    vm.profile = response.data;
                    console.log(vm.profile);
                });
        }
        return init();*/
    }
})();