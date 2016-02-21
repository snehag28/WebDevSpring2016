'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,$rootScope,UserService){
        console.log("Hello from profile controller!");
        console.log("username:"+$rootScope.username+" password:"+$rootScope.password);
        $scope.update = update;
        return update;

        function update(){
            var user = $rootScope;
            var newUser = UserService.updateUser(user._id,user);
        }
    }
})();