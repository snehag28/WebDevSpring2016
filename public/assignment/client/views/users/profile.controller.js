'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,$routeParams,$rootScope, UserService) {
        console.log("Hello from profile controller!");
        var vm = this;
        $scope.update = update;

        function update(newUser) {
            UserService
                .updateUser(newUser._id, newUser)
                .then(
                    function(doc){
                        vm.user = doc;
                        console.log(vm.user);
                        if(vm.user){
                            UserService.setUser(vm.user);
                        }
                    }
                )
        };
    }
})();