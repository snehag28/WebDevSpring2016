
// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);

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
        var deferred = q.defer();

        // find one user with mongoose user model's findOne()
        UserModel.findOne(

            // first argument is predicate
            { username: username,
                password: password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
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
        UserModel.find(
            function(err, doc) {

                if (err) {
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

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {
            if (err) {
                // reject promise if error
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
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(findAllUsers());
                }
            });
        return deferred.promise;
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByUsername(userName) {
        var deferred = q.defer();

        // find one user with mongoose user model's findOne()
        UserModel.findOne (
            {username: userName},
            function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function updateUserById(userId, newUser) {
        var deferred = q.defer();
        console.log("in model");
        console.log(newUser);
        // update user with mongoose user model's update()
        UserModel.update (
            {_id: userId},
            {$set: newUser},
            function (err, stats) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(stats);
                }
            });
        return deferred.promise;
    }
};
