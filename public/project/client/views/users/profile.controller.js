'use strict';

(function (){
    angular
        .module("BookApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,UserService) {
        //console.log("Hello from profile controller!");
        $scope.update = update;

        function update(newUser) {
            UserService
                .updateUserById(newUser._id, newUser)
                .then(
                    function(doc){
                        var user = doc;
                        if(user){
                            UserService.setUser(user);
                        }
                    }
                )
        }
    }
})();