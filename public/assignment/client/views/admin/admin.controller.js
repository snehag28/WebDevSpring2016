'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);

    function AdminController(UserService){
        var vm = this;
        vm.sortType = 'username';
        vm.sortReverse = false;
        vm.selectedUserIndex = null;

        vm.addUser = addUser;
        vm.removeUser = removeUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;

        function init() {
            UserService.findAllUsers()
                .then(
                    function(doc) {
                        vm.users = doc.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                )
        }
        init();

        function addUser(newUser) {
            UserService
                .createUserByAdmin(newUser)
                .then(
                    function (doc) {
                        vm.users = doc.data;
                        vm.selectedUserIndex = null;
                        vm.newUser = {};
                        console.log(vm.users);
                    }
                );
        }

        function updateUser(changedUser) {
            var newUser = {};
            newUser.username = changedUser.username;
            newUser.password = changedUser.password;
            newUser.firstName = changedUser.firstName;
            newUser.lastName = changedUser.lastName;
            newUser.roles = changedUser.roles;
            UserService
                .updateUser(changedUser._id, newUser)
                .then(
                    function(doc){
                        init();
                        vm.newUser = {};
                    }
                );
        }

        function removeUser(user) {
            UserService.deleteUserById(user._id)
                .then(
                    function(doc) {
                        //vm.users.splice(index,1);
                        init();
                    }
                )
        }

        function selectUser(user){
            vm.newUser = {
                "_id" : user._id,
                "username" : user.username,
                "password" : user.password,
                "firstName" : user.firstName,
                "lastName" : user.lastName,
                "roles" : user.roles
            };
        }
    }
})();