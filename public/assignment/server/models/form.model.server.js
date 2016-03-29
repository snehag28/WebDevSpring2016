var forms = require("./form.mock.json");
var uuid = require('node-uuid');

module.exports = function(db, mongoose){
    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        getFieldsForFormId: getFieldsForFormId,
        getFieldByFormIdFieldId: getFieldByFormIdFieldId,
        deleteFieldByFormIdFieldId: deleteFieldByFormIdFieldId,
        updateFieldByFormIdFieldId: updateFieldByFormIdFieldId,
        addFieldToFormId: addFieldToFormId,
        ReorderFormFields:ReorderFormFields
    }

    return api;

    function createFormForUser(userId, form) {
        var _id = uuid.v1();
        form._id = _id;
        form.userId = userId;
        forms.push(form);
        return form;
    }

    function findAllFormsForUser(userId) {
        var formsForUser = [];
        for (var index in forms) {
            var form = forms[index];
            if (form.userId == userId) {
                formsForUser.push(form);
            }
        }
        return formsForUser;
    }

    //function that returns form based on the ID
    function findFormById(formId) {
        for (var index in forms) {
            var form = forms[index];
            if (formId == form._id) {
                return form;
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        var form = findFormById(formId);
        if (form != null) {
            var index = forms.indexOf(form);
            forms.splice(index, 1);
        }
        return forms;
    }

    function updateFormById(formId, newForm) {
        var form = findFormById(formId);
        if (form != null) {
            form.title = newForm.title;
        }
        return form;
    }

    function getFieldsForFormId(formId) {
        var form = findFormById(formId);
        if(form != null) {
            return form.fields;
        }
    }

    function getFieldByFormIdFieldId(formId, fieldId) {
        var form = findFormById(formId);
        if(form != null) {
            var fields = form.fields;
            var field = getFieldById(fields, fieldId);
            return field;
        }
        return null;
    }

    function getFieldById(fields, fieldId) {
        for (var index in fields) {
            var field = fields[index];
            if (fieldId == field._id) {
                return field;
            }
        }
        return null;
    }

    function addFieldToFormId(field, formId) {
        var _id = uuid.v1();
        field._id = _id;
        var form = findFormById(formId);
        if(form.fields){
            form.fields.push(field);
        }else{
            form.fields = [];
            form.fields.push(field);
        }

        return form.fields;
    }

    function deleteFieldByFormIdFieldId(formId, fieldId) {
        var form = findFormById(formId);
        if (form != null) {
            var fields = form.fields;
            var field = getFieldById(fields, fieldId);
            var index = fields.indexOf(field);
            fields.splice(index, 1);
            return fields;
        }
    }

    function updateFieldByFormIdFieldId(formId, fieldId, newField) {
        var form = findFormById(formId);
        if (form != null) {
            var fields = form.fields;
            var field = getFieldById(fields, fieldId);
            field.label = newField.label;
            field.type = newField.type;
            field.placeholder = newField.placeholder;
            field.options = newField.options;
            return form;
        }
    }

    // reference:https://github.com/dev92/WebDevSpring2016/
    function ReorderFormFields(formId,fields){
        var requiredForm = findFormById(formId);
        if(requiredForm!=null){
            requiredForm.fields = fields;
            return updateFormById(requiredForm._id,requiredForm).fields;
        }
        return null;
    }

}
