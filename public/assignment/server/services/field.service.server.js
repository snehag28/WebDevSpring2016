module.exports = function(app, fieldModel){
    app.get("/api/assignment/form/:formId/field", getFieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFormIdFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormIdFieldId);
    app.post("/api/assignment/form/:formId/field", addFieldToFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormIdFieldId);
//    app.put("/api/assignment/form/:formId/field", ReorderFormFields);

    function getFieldsForFormId(req, res){
        fieldModel.getFieldsForFormId(req.params.formId)
            .then(function(form) {
                    res.json(form.fields);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function getFieldByFormIdFieldId(req, res){
        fieldModel.getFieldByFormIdFieldId(req.params.formId, req.params.fieldId)
            .then(function(field) {
                    res.json(field);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldByFormIdFieldId(req, res){
        fieldModel.deleteFieldByFormIdFieldId(req.params.formId, req.params.fieldId)
            .then(function(form) {
                    res.json(form.fields);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function addFieldToFormId(req, res){
        fieldModel.addFieldToFormId(req.body, req.params.formId)
            .then( function(field) {
                    res.json(field);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldByFormIdFieldId(req, res){
        fieldModel.updateFieldByFormIdFieldId(req.params.formId, req.params.fieldId,req.body)
            .then(function(field) {
                    res.json(field);
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

