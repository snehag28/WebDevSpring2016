'use strict';
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            findUserByUsername: findUserByUsername,
            login: login,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            updateUserByAdmin: updateUserByAdmin,
            findUserById: findUserById,
            setUser: setUser,
            getUser: getUser,
            logout: logout,
            createUserByAdmin: createUserByAdmin
        };
        return api;

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username="+username);
        }

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/admin/user",$rootScope.user);
        }

        function createUser(user) {
            return $http.post("/api/assignment/register",user);

        }

        function createUserByAdmin (user) {
            return $http.post("/api/assignment/admin/user",user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/admin/user/"+userId);
        }

        function findUserById(userId){
            $http.get("/api/assignment/user/"+userId);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/assignment/user/"+userId, newUser);
        }

        function updateUserByAdmin(userId, newUser) {
            return $http.put("/api/assignment/admin/user/"+userId, newUser);
        }

        function setUser(newUser) {
            $rootScope.user = newUser;
        }

        function getUser() {
            return $rootScope.user;
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }
    }
})();
