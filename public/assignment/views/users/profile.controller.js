'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,$rootScope,UserService) {
        console.log("Hello from profile controller!");

        $scope.update = function (newUser) {
            UserService.updateUser(newUser._id, newUser,
                function (response) {
                    $rootScope.user = response;
                    console.log($rootScope.user._id + ", " + $rootScope.user.firstName + ", " + $rootScope.user.lastName);
                }
            )
        };
    }
})();