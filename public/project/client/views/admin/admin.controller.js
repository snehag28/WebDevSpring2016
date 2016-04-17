'use strict';

(function (){
    angular
        .module("BookApp")
        .controller("AdminController",AdminController);

    function AdminController($scope,UserService){

        $scope.selectedUserIndex = null;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;

        function init() {
            getAllUsers();
        }
        init();

        function getAllUsers(){
            UserService.findAllUsers()
                .then(
                    function(response){
                        $scope.users = response;
                    }
                )
        }

        function updateUser(user){
            UserService.updateUserById($scope.users[$scope.selectedUserIndex]._id, user)
                .then(
                    function(response){
                        var updatedUser = response;
                        $scope.users[$scope.selectedUserIndex] = updatedUser;
                        $scope.selectedUserIndex = null;
                        $scope.newUser = {};
                    }
                )
        }

        function deleteUser(index){
            UserService.deleteUserById($scope.users[index]._id)
                .then(
                    function(response){
                        $scope.users = response;
                    })
        }

        function selectUser(index){
            $scope.selectedUserIndex = index;
            $scope.newUser = {
                //"_id" : $scope.users[index]._id,
                "username" : $scope.users[index].username,
                "email" : $scope.users[index].email,
                "role" : $scope.users[index].role
            };
        }
    }
})();