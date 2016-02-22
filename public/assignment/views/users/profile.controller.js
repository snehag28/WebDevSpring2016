'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,$rootScope,UserService){
        console.log("Hello from profile controller!");
        $scope.update = update;
        return update;

        function update(newUser){
            console.log(newUser._id);
            $rootScope.user = UserService.updateUser(newUser._id,newUser);
            console.log($rootScope.user._id+", "+$rootScope.user.firstName+", "+$rootScope.user.lastName);
        }
    }
})();