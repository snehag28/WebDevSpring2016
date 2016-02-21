'use strict';
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {

        var users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["student"]
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"]
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"]
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"]
            }
        ];

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;

        function findUserByUsernameAndPassword(username, password, callback) {
            var userObj = null;
            //Iterates over the array of current users looking for user object whose username and password match the parameters
            for (var user in users) {
                if (user.username == username && user.password == password) {
                    userObj = user;
                }
            }
            //Calls back with user found or null otherwise
            if (typeof callback === "function") {
                callback(userObj);
            }

            return userObj;
        }

        function findAllUsers(callback) {
            //Accepts parameter callback function
            //Calls back with array of all users
            callback(users);

        }

        function createUser(user, callback) {
            //Accepts parameters user object and callback function
            //Adds property called _id with unique value to the user object parameter.
            //You can use (new Date).getTime() to get a unique time stamp
            var _id = (new Date).getTime();
            var newUser = {
                "_id": _id,
                "username": user.username,
                "password": user.password,
                "email" : user.email
            };
            //Adds the new user to local array of users
            users.concat(newUser);
            //Calls back with new user
            if (typeof callback === "function") {
                callback(newUser);
            }
        }

        function deleteUserById(userId, callback) {
            //Accepts parameters user id and callback function
            //Iterates over the array of current users looking for a user object whose user id is equal to parameter user id
            var user = findUserById(userId);
            //If found, removes user from the array of current users
            if(user != null){
                var index = users.indexOf(user);
                users.splice(index, 1);
            }
            //Calls back with remaining array of all users
            if (typeof callback === "function") {
                callback(users);
            }
        }

        function findUserById(userId){
            for (var user in users){
                if(userId == user._id){
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, newUser, callback) {
            //Accepts parameters user id, user object and callback function
            //Iterates over the array of current users looking for a user object
            // whose user id is equal to parameter user id
            var user = findUserById(userId);
            //If found, updates user with new user properties
            if(user != null){
                user.firstName = newUSer.firstName;
                user.lastName = newUser.lastName;
                user.username = newUser.username;
                user.password = newUser.password;
                user.roles = newUser.roles;
            }
            //Calls back with updated user
            if (typeof callback === "function") {
                callback(user);
            }
        }
    }
})();
