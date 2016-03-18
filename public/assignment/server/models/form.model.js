var forms = require("./form.mock.json");

module.exports = function(){
    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        getFieldsForFormId: getFieldsForFormId,
        getFieldByFormIdFieldId: getFieldByFormIdFieldId,
        deleteFieldByFormIdFieldId: deleteFieldByFormIdFieldId,
        updateFieldByFormIdFieldId: updateFieldByFormIdFieldId,
        addFieldToFormId: addFieldToFormId
    }

    return api;

    function createFormForUser(userId, form) {
        var _id = (new Date).getTime();
        form._id = _id;
        form.userId = userId;
        forms.push(form);
        return form;
    }

    function findAllFormsForUser(userId) {
        console.log("in findAllFormsForUser in model.js");
        var formsForUser = [];
        for (var index in forms) {
            var form = forms[index];
            if (form.userId == userId) {
                console.log("index:"+index);
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
        var _id = (new Date).getTime();
        field._id = _id;
        var form = findFormById(formId);
        form.fields.push(field);
        return form;
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
            field.placeholder = newfield.placeholder;
            field.options = newField.options;
            return form;
        }
    }

}

