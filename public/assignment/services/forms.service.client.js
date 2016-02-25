'use strict';
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234},
        ];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form, callback) {
            //Accepts parameters user id, form object, and callback function
            //Adds property called _id with unique id. You can use (new Date).getTime() to retrive a unique number
            var _id = (new Date).getTime();
            //Adds property called userId equal to user id parameter
            form._id = _id;
            form.userId = userId;
            //Adds new form to local array of forms
            forms.push(form);
            //console.log(forms);
            //Calls back with new form
            if (typeof callback == "function") {
                callback(form);
            }
        }

        function findAllFormsForUser(userId, callback) {
            //Accepts parameter user id, and callback function
            //Iterates over the array of current forms looking for forms whose user id is parameter user id
            //console.log("in findAllFormsForUser:"+userId);
            var formsForUser = [];
            for (var index in forms) {
                var form = forms[index];
                if (form.userId == userId) {
                    formsForUser.push(form);
                }
            }
            //Calls back with found forms for user id parameter, empty array otherwise
            if (typeof callback == "function") {
                callback(formsForUser);
            }
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

        function deleteFormById(formId, callback) {
            //Accepts parameter form id and callback function
            //Iterates over array of forms looking for form whose id is form id parameter
            var form = findFormById(formId);
            //If found, removes form from current array of forms
            if (form != null) {
                var index = forms.indexOf(form);
                forms.splice(index, 1);
            }
            //Calls back with remaining array of forms
            if (typeof callback == "function") {
                callback(forms);
            }
        }

        function updateFormById(formId, newForm, callback) {
            //Accepts parameter form id, new form object, and callback function
            //Iterates over array of forms looking for form whose id is form id parameter
            var form = findFormById(formId);
            //If found, updates form object with new form values
            if (form != null) {
                form.title = newForm.title;
            }
            //Calls back with update form
            if (typeof callback == "function") {
                callback(form);
            }
        }
    }
})();
