'use strict';
(function() {
    angular
        .module("BookApp")
        .factory("UserService", UserService);

    function UserService() {

        var users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": "member",
                "following": ["bob","nisha"], "followers": ["bob","sneha"],
                "email": "alice@gmail.com", "gender" : "female",
                "aboutme": "about alice", "favoritebooks":"alice's favorite books"
            },
            {
                "_id": 234, "firstName": "Sneha", "lastName": "Gaikwad",
                "username": "sneha", "password": "sneha", "roles": "admin",
                "following": [], "followers": [],
                "email": "sneha@gmail.com", "gender" : "female",
                "aboutme": "about sneha", "favoritebooks":"sneha's favorite books"
            },
            {
                "_id": 345, "firstName": "Nisha", "lastName": "Ramakrishnan",
                "username": "nisha", "password": "nisha", "roles": "editor",
                "following": [], "followers": [],
                "email": "nisha@gmail.com", "gender" : "female",
                "aboutme": "about nisha", "favoritebooks":"nisha's favorite books"
            },
            {
                "_id": 567, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": "member",
                "following": [], "followers": [],
                "email": "bob@gmail.com", "gender" : "male",
                "aboutme": "about bob", "favoritebooks":"bob's favorite books"
            }
        ];

        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUserById: updateUserById
        };
        return service;

        function findUserByCredentials(username, password, callback) {
            var userObj = null;
            //console.log("in findUserByCrendentials");
            //Iterates over the array of current users looking for user object whose username and password match the parameters
            for (var index in users) {
                if (users[index].username == username && users[index].password == password) {
                    userObj = users[index];
                }
            }
            //Calls back with user found or null otherwise
            if (typeof callback === "function") {
                callback(userObj);
            }
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
            users.push(newUser);

            //console.log(users);
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

        // function to return user based on ID
        function findUserById(userId){
            //console.log("in findUserById:"+userId);
            for (var index in users){
                var user = users[index];
                //console.log("in findUserById for:"+user._id);
                if(userId == user._id){
                    //console.log("in findUserById if:"+userId);
                    return user;
                }
            }
            return null;
        }

        function updateUserById(userId, newUser, callback) {
            //Accepts parameters user id, user object and callback function
            //Iterates over the array of current users looking for a user object
            // whose user id is equal to parameter user id
            var user = findUserById(userId);
            //console.log("in updateUser:"+userId);
            //If found, updates user with new user properties
            if(user != null){
                user.firstName = newUser.firstName;
                user.lastName = newUser.lastName;
                user.username = newUser.username;
                user.password = newUser.password;
                user.roles = newUser.roles;
                user.email = newUser.email;
            }
            //Calls back with updated user
            if (typeof callback === "function") {
                callback(user);
            }
        }
    }
})();