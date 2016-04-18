// load q promise library
var q = require("q");

module.exports = function(db, mongoose) {

    // load review schema
    var BOMSchema = require("./booksOfMonth.schema.server.js")(mongoose);

    // create book model from schema
    var BomModel = mongoose.model('BomModel', BOMSchema);

    var api = {
        getBooksToPublish: getBooksToPublish,
        getBOMById: getBOMById,
        createBOM: createBOM,
        getAllBOMs: getAllBOMs,
        updateBOMById: updateBOMById,
        deleteBOMById: deleteBOMById
    };

    return api;

    function getAllBOMs() {
        var deferred = q.defer();
        BomModel.find(
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

    function createBOM(bom) {
        var deferred = q.defer();

        BomModel.create(bom, function (err, doc) {

            if (err) {
                // reject promise if error
                console.log("err: "+err);
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

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

    function updateBOMById(bookId, newBook) {
        var deferred = q.defer();

        // update user with mongoose user model's update()
        BomModel.update (
            {_id: bookId},
            {$set: newBook},
            function (err, stats) {
                if(err) {
                    console.log("err: "+err);
                    deferred.reject(err);
                }
                else {
                    BomModel.findById(bookId,
                        function (err, user) {
                            if(err) {
                                console.log("err: "+err);
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(user);
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function deleteBOMById(bookId) {
        var deferred = q.defer();

        BomModel.remove(
            {_id: bookId},
            function(err, stats) {
                if (err) {
                    // reject promise if error
                    console.log("err: "+err);
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(stats);
                }
            });
        return deferred.promise;
    }
};