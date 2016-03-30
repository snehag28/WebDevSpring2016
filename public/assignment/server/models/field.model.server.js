var mongoose = require("mongoose");
// load q promise library
var q = require("q");

module.exports = function(formModel) {

    var FormModel = formModel.getForm();

    // load user schema
    var FieldSchema = require("./field.schema.server.js")(mongoose);

    // create user model from schema
    var FieldModel = mongoose.model('Field', FieldSchema);

    var api = {
        getFieldById: getFieldById,
        getFieldByFormIdFieldId: getFieldByFormIdFieldId,
        getFieldsForFormId: getFieldsForFormId,
        addFieldToFormId: addFieldToFormId,
        deleteFieldByFormIdFieldId: deleteFieldByFormIdFieldId,
        updateFieldByFormIdFieldId: updateFieldByFormIdFieldId,
    };
    return api;

    function getFieldById(fieldId) {
        var deferred = q.defer();

        // find one field with mongoose field model's findOne()
        FieldModel.fineOne(
            {_id: fieldId},

            function (err,doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
    }

    function getFieldsForFormId(formId) {
        return FormModel.findById(formId).select("fields");
    }

    function getFieldByFormIdFieldId(formId, fieldId) {
        return FormModel.findById(formId)
            .then(
                function(form) {
                    return form.fields.id(fieldId);
                }
            );
    }

    function addFieldToFormId(field, formId) {
        var deferred = q.defer();

        FieldModel.create(
            field,
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    var field = doc;
                    FormModel.update(
                        {_id: formId},
                        { $push: {fields: field}},
                        function(err, stats) {
                            if(err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(stats);
                            }
                        }
                    );
                }
            }
        );
        return deferred.promise;
    }

    function deleteFieldByFormIdFieldId(formId, fieldId) {
        var deferred = q.defer();

        FormModel.update(
            {_id: formId},
            { $pull: {fields : {_id: fieldId}}},
            function (err,doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(deleteFieldByFieldId(fieldId));
                }
            }
        );
        return deferred.promise;
    }

    function deleteFieldByFieldId(fieldId) {
        var deferred = q.defer();

        FieldModel.remove(
            {_id: fieldId},
            function (err,stats) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(stats);
                }
            }
        );
        return deferred.promise;
    }

    function updateFieldByFormIdFieldId(formId, fieldId, newField) {
        var deferred = q.defer();

        FieldModel.update(
            {_id: fieldId},
            {$set: newField},
            function (err,stats) {
                if(err) {
                    deferred.reject(err);
                } else {
                    FormModel.update(
                        {_id: formId},
                        { $pull: {fields: {_id: fieldId}}}
                    );
                    deferred.resolve(stats);
                }
            }
        )
    }

}
