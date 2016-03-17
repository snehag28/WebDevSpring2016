var formModel = require("./../models/form.model.js")();

module.exports = function(app){
    app.get("/api/assignment/user/:userId/form",getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.post("/api/assignment/user/:userId/form",createFormForUser);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId",deleteForm);


    function createFormForUser(req, res){
        var newForm = req.body;
        var userId = req.params.userId;
        var form = formModel.createFormForUser(userId,form);
        res.json(form);
    }

    function login(req, res){
        console.log("in service.server getUserByCredentials");
        var user = userModel.findUserByCredentials(req.params.username,req.params.password);
        res.json(user);
    }

    function getUserByName(req, res){
        console.log("in getUserByName");
        var user = userModel.findUserByUsername(req.params.username);
        res.json(user);
    }

    function allUsers(req, res){
        console.log("in allUsers");
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function profile(req, res){
        console.log("in profile");
        var user = userModel.findUserById(req.params.id);
        res.json(user);
    }

    function register(req, res){
        console.log("in register");
        var user = req.body;
        var newUser = userModel.createUser(user);
        res.json(newUser);
    }

    function updateUser(req, res){
        console.log("in updateUser");
        var user = req.body;
        var users = userModel.updateUserById(req.params.id, user);
        res.json(users);
    }

    function deleteUser(req, res){
        console.log("in deleteUser");
        var users = userModel.deleteUserById(req.params.id);
        res.json(users);
    }

}