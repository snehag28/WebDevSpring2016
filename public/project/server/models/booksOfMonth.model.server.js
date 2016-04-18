// load q promise library
var q = require("q");

module.exports = function(db, mongoose) {

    // load review schema
    var BOMSchema = require("./booksOfMonth.schema.server.js")(mongoose);

    // create book model from schema
    var BomModel = mongoose.model('BomModel', BOMSchema);

    var api = {
        getBooksToPublish: getBooksToPublish,
        getBOMById: getBOMById
    };

    return api;

    function getBooksToPublish() {
        var deferred = q.defer();
        BomModel.find(
            {
                publish: true
            },
            function(err,doc) {
                if (err) {
                    // reject promise if error
                    console.log("err: "+err);
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function getBOMById(id) {
        var deferred = q.defer();
        BomModel.findOne(
            {
                googleBooksId: id
            },
            function(err,doc) {
                if (err) {
                    // reject promise if error
                    console.log("err: "+err);
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }
};