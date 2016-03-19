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
            setUser: setUser,
            logout: logout
        };
        return api;

        function findUserByUsername(username){
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username="+username)
                .then(
                    function(response) {
                        deferred.resolve(response.data);
                    },
                    function(error) {
                        deferred.reject(error);
                    }
                );
            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            console.log("in userservice findUserByCredentials");
            var deferred = $q.defer();

            $http.get("/api/assignment/user?username="+username+"&password="+password)
                .then(
                    function(response) {
                        deferred.resolve(response.data);
                    },
                    function(error) {
                        deferred.reject(error);
                    }
                );
            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/assignment/user")
                .then(
                    function(response){
                        deferred.resolve(response.data);
                    },
                    function(error) {
                        deferred.reject(error);
                    }
                );
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user",user)
                .success(function (response){
                    deferred.resolve(response);
                });
            return deferred.promise;
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
            var deferred = $q.defer();
            $http.put("/api/assignment/user/"+userId, newUser)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function setUser(newUser) {
            $rootScope.user = newUser;
        }

        function logout() {
            $rootScope.user = null;
            console.log("in logout");
            console.log($rootScope.user);
        }
    }
})();
