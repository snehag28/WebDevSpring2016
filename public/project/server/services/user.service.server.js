//var userModel = require("./../models/user.model.server.js")();

module.exports = function(app, projectUserModel){
    app.get("/api/assignment/user?username=username",getUsers);
    app.get("/api/assignment/user?username=username&password=password",getUsers);
    app.get("/api/assignment/user", getUsers);
    app.get("/api/assignment/user/:id", profile);
    app.post("/api/assignment/user",register);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id",deleteUser);

    function getUsers(req, res){
        if(req.query.username){
            if(req.query.password){
                login(req, res);
            }else{
                getUserByName(req, res);
            }
        }else{
            allUsers(req, res);
        }
    }

    function login(req, res){
        // use model to find user by credentials
        projectUserModel.findUserByCredentials(req.query.username,req.query.password)
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
        projectUserModel.findAllUsers()
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

    function register(req, res){
        var user = req.body;
        projectUserModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    //req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
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

};