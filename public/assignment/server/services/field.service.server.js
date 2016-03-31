module.exports = function(app, fieldModel, formModel){
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFormIdFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormIdFieldId);
    app.post("/api/assignment/form/:formId/field", addFieldToFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormIdFieldId);
    //app.put("/api/assignment/form/:formId/field", ReorderFormFields);

    function getFieldByFormIdFieldId(req, res){
        formModel.findFormById(req.params.formId)
            .then(
                function(form) {
                    console.log("in getFieldByFormIdFieldId");
                    console.log(form.fields.id(req.params.fieldId));
                    return form.fields.id(req.params.fieldId);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function deleteFieldByFormIdFieldId(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        console.log("deleteFieldByFormIdFieldId");
        formModel.findFormById(formId)
            .then(
                function(form) {
                    fieldModel.deleteField(fieldId)
                        .then(
                            function (doc) {
                                console.log(form.fields);
                                form.fields.id(fieldId).remove();
                                form.save();
                                console.log(form.fields);
                                res.json(form);
                            },
                            function (err) {
                                res.status(400).send(err);
                            });
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function addFieldToFormId(req, res){
        var newField = req.body;
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(
                function(form) {
                    fieldModel.createField(newField)
                        .then(
                            function (field) {
                                form.fields.push(field);
                                form.save();
                                res.json(form);
                            },
                            function(err) {
                                res.status(400).send(err);
                            });
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function updateFieldByFormIdFieldId(req, res){
        var newField = req.body;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.findFormById(formId)
            .then(
                function(form) {
                    form.fields.id(newField._id).remove();
                    var field = fieldModel.updateField(fieldId, newField);
                    form.fields.push(field);
                    return form.save();
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    // reference:https://github.com/dev92/WebDevSpring2016/
    /*function ReorderFormFields(req,res){
        res.json(formModel.ReorderFormFields(req.params["formId"],req.body));
    }*/
}

