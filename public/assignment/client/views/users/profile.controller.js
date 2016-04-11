'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController(UserService) {
        var vm = this;
        vm.update = update;

        function init() {
            vm.user = UserService.getUser();
            console.log(vm.user);
        }
        init();

        function update(changedUser) {
            var newUser = {};
            newUser.username = changedUser.username;
            newUser.password = changedUser.password;
            newUser.firstName = changedUser.firstName;
            newUser.lastName = changedUser.lastName;
            newUser.emails = changedUser.emails;
            newUser.phones = changedUser.phones;
            UserService
                .updateUser(changedUser._id, newUser)
                .then(
                    function(doc){
                        var user = doc.data;
                        if(user){
                            UserService.setUser(user);
                        }
                    }
                )
        }
    }
})();