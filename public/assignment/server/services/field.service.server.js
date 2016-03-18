var formModel = require("./../models/form.model.js")();

module.exports = function(app){
    app.get("/api/assignment/form/:formId/field", getFieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFormIdFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormIdFieldId);
    app.post("/api/assignment/form/:formId/field", addFieldToFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormIdFieldId);

    function getFieldsForFormId(req, res){
        var fields = formModel.getFieldsForFormId(req.params.formId);
        res.json(fields);
    }

    function getFieldByFormIdFieldId(req, res){
        var field = formModel.getFieldByFormIdFieldId(req.params.formId, req.params.fieldId);
        res.json(field);
    }

    function deleteFieldByFormIdFieldId(req, res){
        var fields = formModel.deleteFieldByFormIdFieldId(req.params.formId, req.params.fieldId);
        res.json(forms);
    }

    function addFieldToFormId(req, res){
        var field = formModel.addFieldToFormId(req.body, req.params.formId);
        res.json(field);
    }

    function updateFieldByFormIdFieldId(req, res){
        var newField = req.body;
        var field = formModel.updateFieldByFormIdFieldId(req.params.formId, req.params.fieldId, newField);
        res.json(field);
    }
}

