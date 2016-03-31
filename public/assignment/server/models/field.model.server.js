
// load q promise library
var q = require("q");

module.exports = function(db, mongoose) {

    // load user schema
    var FieldSchema = require("./field.schema.server.js")(mongoose);

    // create user model from schema
    var FieldModel = mongoose.model('FieldModel', FieldSchema);

    var api = {
        getFieldById: getFieldById,
        createField: createField,
        deleteField: deleteField,
        updateField: updateField,
    };
    return api;

    function getFieldById(fieldId) {
        var deferred = q.defer();

        // find one field with mongoose field model's findOne()
        FieldModel.findById(fieldId,
            function (err,doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
    }

    function createField(field) {
        var deferred = q.defer();
        //console.log("in createField");
        //console.log(field);
        FieldModel.create(
            field,
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    //console.log(doc)
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function deleteField(fieldId) {
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

    function updateField(fieldId, newField) {
        var deferred = q.defer();
        FieldModel.update(
            {_id: fieldId},
            {$set: newField},
            function (err, field) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(field);
                }
            });
        return deferred.promise;
    }

}
