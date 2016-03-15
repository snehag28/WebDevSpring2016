var forms = require("./user.mock.json");

module.exports = function(){
    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById
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
}

