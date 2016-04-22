
// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('UserModel', UserSchema);

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

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        // find one user with mongoose user model's findOne()
        UserModel.findOne(

            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {
                if (err) {
                    console.log(err);
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
        //console.log("in model findallusers");
        var deferred = q.defer();

        // find users with mongoose user model's find()
        UserModel.find(
            function(err, doc) {

                if (err) {
                    console.log(err);
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function createUser(user) {
        //console.log(user);
        var newUser = {
            "username": user.username,
            "password": user.password,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "emails" : [user.emails],
            "phones" : [user.phones],
            "roles" : user.roles,
            "type" : user.type
        };
        //console.log(newUser);
        var deferred = q.defer();

        UserModel.create(newUser, function (err, doc) {

            if (err) {
                // reject promise if error
                console.log(err);
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
        UserModel.remove(
            {_id: userId},
            function(err, stats) {

                if (err) {
                    // reject promise if error
                    console.log(err);
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
        UserModel.findById(userId,
            function(err, doc) {

                if (err) {
                    console.log(err);
                    // reject promise if error
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
        UserModel.findOne (
            {username: userName},
            function (err, user) {
                if(err) {
                    console.log(err);
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function updateUserById(userId, newUser) {
        var deferred = q.defer();
        if(newUser.emails) {
            if(newUser.emails && newUser.emails.indexOf(",")>-1) {
                newUser.emails =  newUser.emails.split(",");
            }
        }
        if(newUser.phones) {
            if(newUser.phones && newUser.phones.indexOf(",")>-1) {
                newUser.phones =  newUser.phones.split(",");
            }
        }
        // update user with mongoose user model's update()
        UserModel.update (
            {_id: userId},
            {$set: newUser},
            function (err, stats) {
                if(err) {
                    console.log(err);
                    deferred.reject(err);
                }
                else {
                    UserModel.findById(userId,
                    function (err, user) {
                        if(err) {
                            console.log(err);
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