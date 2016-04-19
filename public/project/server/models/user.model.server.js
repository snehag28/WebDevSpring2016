
// load q promise library
var q = require("q");
var uuid = require('node-uuid');

module.exports = function(db, mongoose) {

    // load user schema
    var ProjectUserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var ProjectUserModel = mongoose.model('ProjectUserModel', ProjectUserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findUserByFirstName: findUserByFirstName
    };
    return api;

    function findUserByFirstName(firstName) {
        var deferred = q.defer();
        ProjectUserModel.find(
            {firstName: new RegExp('^'+firstName+'$', "i")},
            function(err, doc) {

                if (err) {
                    console.log("err: "+err);
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            }
        );
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {

        var deferred = q.defer();

        // find one user with mongoose user model's findOne()
        ProjectUserModel.findOne(

            // first argument is predicate
            { username: username,
                password: password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    console.log("err: "+err);
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        // find users with mongoose user model's find()
        ProjectUserModel.find(
            function (err, doc) {

                if (err) {
                    // reject promise if error
                    console.log("err: "+err);
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function createUser(user) {
        var newUser = {
            "username": user.username,
            "password": user.password,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "dateOfBirth": user.dateOfBirth,
            "email" : user.email,
            "gender" : user.gender,
            "aboutMe": user.aboutMe,
            "favoriteBooks": user.favoriteBooks,
            "following": user.following,
            "followers": user.followers,
            "role" : "member",
            "type" : "project"
        };
        var deferred = q.defer();

        ProjectUserModel.create(newUser, function (err, doc) {

            if (err) {
                // reject promise if error
                console.log("err: "+err);
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();

        // remove user with mongoose user model's remove()
        ProjectUserModel.remove(
            {_id: userId},
            function(err, stats) {

                if (err) {
                    // reject promise if error
                    console.log("err: "+err);
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(findAllUsers());
                }
            });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        ProjectUserModel.findById(userId,
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    console.log("err: "+err);
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function findUserByUsername(userName) {
        var deferred = q.defer();

        // find one user with mongoose user model's findOne()
        ProjectUserModel.findOne (
            {username: userName},
            function (err, user) {
                if(err) {
                    console.log("err: "+err);
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function updateUserById(userId, changedUser) {
        var deferred = q.defer();

        var newUser = {
            username: changedUser.username,
            password: changedUser.password,
            firstName: changedUser.firstName,
            lastName: changedUser.lastName,
            email: changedUser.email,
            dateOfBirth: changedUser.dateOfBirth,
            gender: changedUser.gender,
            following: changedUser.following,
            followers: changedUser.followers,
            aboutMe: changedUser.aboutMe,
            favoriteBooks: changedUser.favoriteBooks,
            role: changedUser.role,
            type: changedUser.type
        };
        // update user with mongoose user model's update()
        ProjectUserModel.update (
            {_id: userId},
            {$set: newUser},
            function (err, stats) {
                if(err) {
                    console.log("err: "+err);
                    deferred.reject(err);
                }
                else {
                    ProjectUserModel.findById(userId,
                        function (err, user) {
                            if(err) {
                                console.log("err: "+err);
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(user);
                            }
                        });
                }
            });
        return deferred.promise;
    }
};

