'use strict';

(function (){
    angular
        .module("BookApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,$rootScope,UserService) {
        //console.log("Hello from profile controller!");
        $scope.update = update;

        function update(newUser) {
            UserService.updateUser(newUser._id, newUser,
                function (response) {
                    $rootScope.user = response;
                    //console.log($rootScope.user._id + ", " + $rootScope.user.firstName + ", " + $rootScope.user.lastName);
                }
            )
        };
    }
})();