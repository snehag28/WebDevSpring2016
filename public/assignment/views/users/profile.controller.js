'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,UserService){
        console.log("Hello from profile controller!");

        function update(user){
            var newUser = UserService.updateUser(user._id,user);
        }
    }
})();