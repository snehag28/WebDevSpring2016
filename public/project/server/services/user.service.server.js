var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");

module.exports = function(app, projectUserModel){

    passport.use('project',   new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post  ('/api/project/login',    passport.authenticate('project'), projectLogin);
    app.post  ('/api/project/logout',   projectLogout);
    app.get   ('/api/project/loggedin', projectLoggedin);
    app.post  ('/api/project/register', projectRegister);

    app.get("/api/project/user?username=username",getUsers);
    app.get("/api/project/user?username=username&password=password",getUsers);
    app.get("/api/project/user", getUsers);
    app.get("/api/project/user?firstName=fname", getUsers);
    app.get("/api/project/user/:id", profile);
    //app.post("/api/project/user",register);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id",deleteUser);

    function projectLocalStrategy(username, password, done) {
        projectUserModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if(user.type == 'project') {
            projectUserModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }
    }

    function getUsers(req, res){
        if(req.query.username){
            if(req.query.password){
                login(req, res);
            }else{
                getUserByName(req, res);
            }
        }
        else if(req.query.firstName) {
            getUserByFirstName(req, res);
        }
        else{
            allUsers(req, res);
        }
    }

    function projectLogin(req, res){
        var user = req.user;
        res.json(user);
    }

    function projectLogout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function projectLoggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function getUserByFirstName(req, res) {
        projectUserModel.findUserByFirstName(req.query.firstName)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserByName(req, res){
        projectUserModel.findUserByUsername(req.query.username)
            .then(
                // return user if promise resolved
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function allUsers(req, res){
        if(isAdmin(req.user)) {
            projectUserModel
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

    function isAdmin(user) {
        if(user.role == "admin") {
            return true
        }
        return false;
    }

    function profile(req, res){
        var userId = req.params.id;

        // use model to find user by id
        projectUserModel.findUserById(userId)
            .then(
                // return user if promise resolved
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function projectRegister(req, res) {
        var newUser = req.body;
        newUser.role = 'member';

        projectUserModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return projectUserModel.createUser(newUser);
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

    function updateUser(req, res){
        var user = req.body;
        projectUserModel.updateUserById(req.params.id,user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res){
        projectUserModel.deleteUserById(req.params.id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

};