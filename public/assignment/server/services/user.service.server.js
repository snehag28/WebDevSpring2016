var userModel = require("./../models/user.model.js")();

module.exports = function(app){
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

        var user = userModel.findUserByCredentials(req.query.username,req.query.password);
        res.json(user);
    }

    function getUserByName(req, res){

        var user = userModel.findUserByUsername(req.query.username);
        res.json(user);
    }

    function allUsers(req, res){

        var users = userModel.findAllUsers();
        res.json(users);
    }

    function profile(req, res){

        var user = userModel.findUserById(req.params.id);
        res.json(user);
    }

    function register(req, res){

        var user = req.body;
        var newUser = userModel.createUser(user);
        res.json(newUser);
    }

    function updateUser(req, res){

        var user = req.body;
        var users = userModel.updateUserById(req.params.id, user);
        res.json(users);
    }

    function deleteUser(req, res){

        var users = userModel.deleteUserById(req.params.id);
        res.json(users);
    }

}