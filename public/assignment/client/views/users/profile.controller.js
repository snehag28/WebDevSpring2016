'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope, UserService) {
        $scope.update = update;

        function update(changedUser) {
            var newUser = {};
            newUser.username = changedUser.username;
            newUser.password = changedUser.password;
            newUser.firstName = changedUser.firstName;
            newUser.lastName = changedUser.lastName;
            newUser.email = changedUser.email;
            newUser.roles = changedUser.roles;
            UserService
                .updateUser(changedUser._id, newUser)
                .then(
                    function(doc){
                        var user = doc;
                        if(user){
                            UserService.setUser(user);
                        }
                    }
                )
        };
    }
})();