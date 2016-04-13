'use strict';
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope, $q) {

        var api = {
            findUserByUsername: findUserByUsername,
            login: login,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById,
            setUser: setUser,
            getUser: getUser,
            logout: logout
        };
        return api;

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username="+username);
        }

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function findAllUsers() {
            console.log("in client findallusers");
            return $http.get("/api/assignment/user",$rootScope.user);
        }

        function createUser(user) {
            return $http.post("/api/assignment/register",user);

        }

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/user/"+userId)
                .success(
                    function(response){
                        deferred.resolve(response);
                    }
                );
            return deferred.promise;
        }

        function findUserById(userId){
            var deferred = $q.defer();
            $http.get("/api/assignment/user/"+userId)
                .then(
                    function(response){
                        deferred.resolve(response);
                    },
                    function(error){
                        deferred.reject(error);
                    }
                );
            return deferred.promise;
        }

        function updateUser(userId, newUser) {
            console.log("in updateUser");
            console.log(newUser);
            return $http.put("/api/assignment/user/"+userId, newUser);
        }

        function setUser(newUser) {
            $rootScope.user = newUser;
        }

        function getUser() {
            return $rootScope.user;
        }

        function logout() {
            $rootScope.user = null;
        }
    }
})();
