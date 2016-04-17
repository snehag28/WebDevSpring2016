'use strict';
(function() {
    angular
        .module("BookApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            login: login,
            logout: logout,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUserById: updateUserById,
            findUserById: findUserById,
            setUser: setUser,
            getUser: getUser,
            getUsersByName: getUsersByName,
            addToFollowerList: addToFollowerList
        };
        return api;

        function login(user) {
            console.log("in client service login");
            return $http.post("/api/project/login", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function addToFollowerList (followed, follower) {
            findUserByUsername(followed)
                .then(
                    function(doc) {
                        doc.followers.push(follower);
                        updateUserById(doc._id, doc);
                    }
                )
        }

        function getUsersByName (fname) {
            return $http.get("/api/project/user?firstName="+fname);
        }

        function findUserByUsername(username){
            return $http.get("/api/project/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username="+username+"&password="+password);
        }

        function findAllUsers() {
            return $http.get("/api/project/user", $rootScope.user);
        }

        function createUser(user) {
            return $http.post("/api/project/register",user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/"+userId);
        }

        function findUserById(userId){
            return $http.get("/api/project/user/"+userId);
        }

        function updateUserById(userId, newUser) {
            console.log("in client");
            return $http.put("/api/project/user/"+userId, newUser);
        }

        function setUser(newUser) {
            $rootScope.user = newUser;
        }

        function getUser() {
            return $rootScope.user;
        }
    }
})();
