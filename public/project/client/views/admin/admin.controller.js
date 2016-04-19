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
                        $scope.users = response.data;
                    }
                )
        }

        function updateUser(user){
            UserService.updateUserById($scope.users[$scope.selectedUserIndex]._id, user)
                .then(
                    function(response){
                        var updatedUser = response.data;
                        $scope.users[$scope.selectedUserIndex] = updatedUser;
                        $scope.selectedUserIndex = null;
                        $scope.newUser = {};
                    }
                );
        }

        function deleteUser(index){
            var username = $scope.users[index].username;
            UserService.deleteUserById($scope.users[index]._id)
                .then(
                    function(response){
                        console.log($scope.users);
                        $scope.users = response.data;
                        for( var i = 0; i < $scope.users.length ; i++ ){
                            //remove the deleted user from follower and following arrays of all users
                            removeFromFollowedList($scope.users[i],username);
                        }
                    });

        }

        function removeFromFollowedList (followedUser, deletedUsername) {
            var followerArray = followedUser.followers;
            var index = followerArray.indexOf(deletedUsername);
            if(index > -1){
                followerArray.splice(index,1);
            }
            var followingArray = followedUser.following;
            index = followingArray.indexOf(deletedUsername);
            if(index > -1){
                followingArray.splice(index,1);
            }
            followedUser.followers = followerArray;
            followedUser.following = followingArray;
            UserService.
                updateUserById(followedUser._id, followedUser)
                .then(
                    function(doc) {
                        //do nothing
                    }
                );
        }

        function selectUser(index){
            $scope.selectedUserIndex = index;
            $scope.newUser = {
                //"_id" : $scope.users[index]._id,
                "username" : $scope.users[index].username,
                "password" : $scope.users[index].password,
                "email" : $scope.users[index].email,
                "role" : $scope.users[index].role
            };
        }
    }
})();