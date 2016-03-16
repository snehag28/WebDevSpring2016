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
            setUser: setUser
        };
        return api;

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            console.log("in userservice findUserByCredentials");
            var deferred = $q.defer();

            $http.get("/api/assignment/user/username="+username+"&password="+password)
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
            return $http.get("/api/assignment/user");
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
            return $http.delete("/api/assignment/user/"+userId);
        }

        function findUserById(userId){
            return $http.get("/api/assignment/user/"+userId);
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
    }
})();
