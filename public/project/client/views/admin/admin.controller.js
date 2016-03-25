'use strict';

(function (){
    angular
        .module("BookApp")
        .controller("AdminController",AdminController);

    function AdminController($scope,$location,$rootScope,UserService){
        console.log("Hello from admin controller!");

        $scope.selectedUserIndex = null;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;

        function init() {
            getAllUsers();
        }
        init();

        function getAllUsers(userId){
            UserService.findAllUsers(
                function(response){
                    $scope.users = response;
                    console.log("in getAllUsers:"+$scope.users);
                }
            )
        };

        function updateUser(user){
            console.log("in updateUser:" + user);
            UserService.updateUserById($scope.users[$scope.selectedUserIndex]._id, user,
                function(response){
                    var updatedUser = response;
                    $scope.users[$scope.selectedUserIndex] = updatedUser;
                    $scope.selectedUserIndex = null;
                    $scope.newUser = {};
                }
            )
        };

        function deleteUser(index){
            UserService.deleteUserById($scope.users[index]._id,
                function(response){
                    $scope.users = response;
                })
        };

        function selectUser(index){
            $scope.selectedUserIndex = index;
            $scope.newUser = {
                "_id" : $scope.users[index]._id,
                "username" : $scope.users[index].username,
                "email" : $scope.users[index].email,
                "roles" : $scope.users[index].roles
            };
        };

    };
})();