'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope, UserService) {
        $scope.update = update;

        function update(newUser) {
            console.log("in update of profile controller:");
            console.log(newUser);
            UserService
                .updateUser(newUser._id, newUser)
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