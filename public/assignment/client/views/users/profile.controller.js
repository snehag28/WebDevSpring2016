'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,$routeParams,$rootScope, UserService) {
        $scope.update = update;

        function update(newUser) {
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