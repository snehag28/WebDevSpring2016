'use strict';
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope, $q) {

        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById,
            setCurrentUser: setCurrentUser
        };
        return api;

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            console.log("in userservice findUserByCredentials");
            return $http.get("/api/assignment/user/username="+username+"&password="+password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user",user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/"+userId);
        }

        function findUserById(userId){
            return $http.get("/api/assignment/user/"+userId);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/assignment/user/"+userId, newUser);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }
    }
})();
