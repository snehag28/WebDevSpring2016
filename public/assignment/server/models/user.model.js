var users = require("./user.mock.json");

module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };
    return api;

    function findUserByCredentials(username, password) {
        for (var index in users) {
            if (users[index].username == username && users[index].password == password) {
                return users[index];
            }
        }
        return null;
    }

    function findAllUsers(callback) {
        return users;
    }

    function createUser(user) {
        var _id = (new Date).getTime();
        var newUser = {
            "_id": _id,
            "username": user.username,
            "password": user.password,
            "email" : user.email
        };
        //Adds the new user to local array of users
        users.push(newUser);

        return users;
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
            if(users[i].id === userId) {
                return users[i];
            }
        }
        return null;
    }

    function updateUser(userId, newUser) {
        var user = findUserById(userId);

        if(user != null){
            user.firstName = newUser.firstName;
            user.lastName = newUser.lastName;
            user.username = newUser.username;
            user.password = newUser.password;
            user.roles = newUser.roles;
            user.email = newUser.email;
        }
       return user;
    }
};
