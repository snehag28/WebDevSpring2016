"use strict";

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");

module.exports = function(app, formUserModel){

    var auth = authorized;

    passport.use('assignment',   new LocalStrategy(assignmentLocalStrategy));
    passport.serializeUser(serializeUserAssignment);
    passport.deserializeUser(deserializeUserAssignment);

    app.post  ('/api/assignment/login', passport.authenticate('assignment'), assignmentLogin);
    app.post  ('/api/assignment/logout',         assignmentLogout);
    app.post  ('/api/assignment/register',       assignmentRegister);
    app.post  ('/api/assignment/admin/user',     createUser);

    app.get   ('/api/assignment/loggedin',       assignmentLoggedin);
    app.get   ('/api/assignment/admin/user',     auth, findAllUsers);

    app.put   ('/api/assignment/user/:id', auth, updateUser);
    app.put   ('/api/assignment/admin/user/:id', auth, updateUserByAdmin);
    app.delete('/api/assignment/admin/user/:id', auth, deleteUser);

    function assignmentLocalStrategy(username, password, done) {
        formUserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                }
            );
    }

    function serializeUserAssignment(user, done) {
        done(null, user);
    }

    function deserializeUserAssignment(user, done) {
        if (user.type == 'assignment') {
            formUserModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }
    }

    function assignmentLogin(req, res) {
        var user = req.user;
        res.json(user);
    }

    function assignmentLogout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function assignmentLoggedin(req, res) {
        //console.log(req.user);
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function assignmentRegister(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];
        newUser.type = 'assignment';

        formUserModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return formUserModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        //console.log(req.user);
        if(isAdmin(req)) {
            formUserModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function deleteUser(req, res) {
        if(isAdmin(req)) {
            formUserModel
                .deleteUserById(req.params.id)
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
        } else {
            res.status(403);
        }
    }

    function updateUser(req, res) {
        var newUser = req.body;
        if(!isAdmin(req)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        formUserModel
            .updateUserById(req.params.id, newUser)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateUserByAdmin(req, res) {
        if(isAdmin(req)) {
            var newUser = req.body;
            if(!isAdmin(req)) {
                delete newUser.roles;
            }
            if(typeof newUser.roles == "string") {
                newUser.roles = newUser.roles.split(",");
            }

            formUserModel
                .updateUserById(req.params.id, newUser)
                .then(
                    function(user){
                        res.json(user);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        formUserModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return formUserModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return formUserModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return formUserModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function isAdmin(req) {
        return (req.isAuthenticated() && req.user.roles.indexOf("admin") > -1);
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};