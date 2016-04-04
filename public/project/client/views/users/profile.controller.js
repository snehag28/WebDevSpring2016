'use strict';

(function (){
    angular
        .module("BookApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,UserService) {
        //console.log("Hello from profile controller!");
        function init() {
            $scope.user.dateOfBirth = new Date($scope.user.dateOfBirth);
        }
        init();
        $scope.update = update;

        function update(newUser) {
            UserService
                .updateUserById(newUser._id, newUser)
                .then(
                    function(doc){
                        var user = doc;
                        if(user){
                            user.dateOfBirth = new Date(user.dateOfBirth);
                            UserService.setUser(user);
                        }
                    }
                )
        }
    }
})();