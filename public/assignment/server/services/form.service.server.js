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
        var form = formModel.createFormForUser(userId,newForm);
        res.json(form);
    }

    function getFormsForUser (req, res) {

        var userId = req.params.userId;
        var forms = formModel.findAllFormsForUser(userId);

        res.json(forms);
    }

    function getFormById (req, res) {
        var form = formModel.findFormById(req.params.formId);
        res.json(form);
    }

    function updateForm (req, res) {
        var newForm = req.body;
        var form = formModel.updateFormById(req.params.formId, newForm);
        res.json(form);
    }

    function deleteForm (req, res) {
        var forms = formModel.deleteFormById(req.params.formId);
        res.json(forms);
    }
}