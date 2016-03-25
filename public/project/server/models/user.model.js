var users = require("./user.mock.json");
var uuid = require('node-uuid');

module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById
    };
    return api;

    function findUserByCredentials(username, password) {

        for (var index in users) {
            if (users[index].username == username && users[index].password == password) {
                console.log(users[index]);
                return users[index];
            }
        }
        return null;
    }

    function findAllUsers() {
        return users;
    }

    function createUser(user) {
        var _id = uuid.v1();
        var newUser = {
            "_id": _id,
            "username": user.username,
            "password": user.password,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email" : user.email,
            "gender" : user.gender,
            "aboutme": user.aboutme,
            "favoritebooks": user.favoritebooks
        };
        //Adds the new user to local array of users
        users.push(newUser);

        return newUser;
    }

    function deleteUserById(userId) {
        userId = parseInt(userId);
        var user = findUserById(userId);
        if(user != null){
            var index = users.indexOf(user);
            users.splice(index, 1);
        }
        return users;
    }

    function findUserById(userId) {
        userId = parseInt(userId);
        for(var i in users) {
            if(users[i]._id === userId) {
                return users[i];
            }
        }
        return null;
    }

    function findUserByUsername(userName) {
        for(var i in users) {
            if(users[i].username === userName) {
                return users[i];
            }
        }
        return null;
    }

    function updateUserById(userId, newUser) {
        var user = findUserById(userId);

        if(user != null){
            user.firstName = newUser.firstName;
            user.lastName = newUser.lastName;
            user.username = newUser.username;
            user.password = newUser.password;
            user.roles = newUser.roles;
            user.email = newUser.email;
            user.gender = newUser.gender;
            user.aboutme = newUser.aboutme;
            user.favoritebooks = newUser.favoritebooks;
        }
        return user;
    }
};

