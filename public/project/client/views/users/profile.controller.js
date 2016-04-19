'use strict';

(function (){
    angular
        .module("BookApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($rootScope, $scope ,UserService) {
        function init() {
            $rootScope.user.dateOfBirth = new Date($rootScope.user.dateOfBirth);
        }
        init();
        $scope.update = update;

        function update(newUser) {
            UserService
                .updateUserById(newUser._id, newUser)
                .then(
                    function(doc){
                        var user = doc.data;
                        if(user){
                            user.dateOfBirth = new Date(user.dateOfBirth);
                            $scope.success = "Updated Successfully";
                            UserService.setUser(user);
                        }
                    }
                );
        }
    }
})();