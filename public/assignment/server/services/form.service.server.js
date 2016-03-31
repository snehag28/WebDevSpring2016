module.exports = function(app, fieldModel, formModel){
    app.get("/api/assignment/user/:userId/form",getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.post("/api/assignment/user/:userId/form",createForm);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId",deleteForm);

    function getFormsForUser (req, res) {
        var userId = req.params.userId;

        formModel.findAllFormsForUser(userId)
            .then(function (forms) {
                    res.json(forms);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function getFormById (req, res) {
        formModel.findFormById(req.params.formId)
            .then(function(form) {
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function createForm(req, res){
        var newForm = req.body;
        var userId = req.params.userId;

        newForm = formModel.createFormForUser(userId, newForm)
            .then(
                function (form) {
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateForm (req, res) {
        var newForm = req.body;
        newForm = formModel.updateFormById(req.params.formId, newForm)
            .then(
                function(form) {
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function deleteForm (req, res) {
        formModel.deleteFormById(req.params.formId)
            .then(
                function(forms) {
                    res.json(forms);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }
}