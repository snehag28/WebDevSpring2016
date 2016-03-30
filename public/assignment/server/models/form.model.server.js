
// load q promise library
var q = require("q");

module.exports = function(db, mongoose){
    // load user schema
    var FormSchema = require("./form.schema.server.js")(mongoose);

    // create user model from schema
    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        getForm: getForm,
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        ReorderFormFields:ReorderFormFields
    };

    return api;

    function getForm(){
        return FormModel;
    }

    function createFormForUser(userId, form) {
        var deferred = q.defer();

        form["userId"] = userId;

        FormModel.create(form,
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();
        console.log("in findAllFormsForUser:"+userId);

        FormModel.find({ userId: userId },
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    console.log(doc);
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    //function that returns form based on the ID
    function findFormById(formId) {
        return FormModel.findById(formId);
    }

    function deleteFormById(formId) {

        var defered = q.defer();

        FormModel.remove(
            {_id: formId},
            function(err, stats) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(findAllFormsForUser);
                }
            }
        );
        return deferred.promise;
    }

    function updateFormById(formId, newForm) {
        var deferred = q.defer();

        FormModel.update(
            {_id: formId},
            {$set: newForm},
            function(err, stats) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(findFormById(formId));
                }
            }
        );
        return deferred.promise;
    }

    // reference:https://github.com/dev92/WebDevSpring2016/
    function ReorderFormFields(formId, fields){
        var requiredForm = findFormById(formId);
        if(requiredForm!=null){
            requiredForm.fields = fields;
            return updateFormById(requiredForm._id,requiredForm).fields;
        }
        return null;
    }
}

