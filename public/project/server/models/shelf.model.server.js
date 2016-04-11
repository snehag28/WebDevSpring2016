
// load q promise library
var q = require("q");

module.exports = function(db, mongoose) {

    // load review schema
    var ShelfSchema = require("./shelf.schema.server.js")(mongoose);

    // create book model from schema
    var ShelfModel = mongoose.model('ShelfModel', ShelfSchema);

    var api = {
        createShelf: createShelf,
        findAllBooksForUser: findAllBooksForUser,
        updateShelfById: updateShelfById,
        findAllBooksForUserByShelf: findAllBooksForUserByShelf,
        deleteBookForUser: deleteBookForUser
    };
    return api;

    function createShelf(shelf) {
        var deferred = q.defer();

        ShelfModel.create(shelf, function (err, doc) {
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

    function findAllBooksForUser(userId) {
        var deferred = q.defer();

        ShelfModel.find(
            { userId: userId },
            function (err, doc) {
                if (err) {
                    // reject promise if error
                    console.log("err: "+err);
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function findAllBooksForUserByShelf(userId, shelf) {
        var deferred = q.defer();

        // find users with mongoose user model's find()
        ShelfModel.find(
            { userId: userId, shelf: shelf },
            function (err, doc) {
                if (err) {
                    // reject promise if error
                    console.log("err: "+err);
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    //deletes a user object from the books UserShelf
    function deleteBookForUser(bookId, userId) {
        var deferred = q.defer();

        ShelfModel.remove(
            { googleBooksId: bookId ,
              userId: userId },

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

    function updateShelfById(shelfId, newShelf) {
        var deferred = q.defer();

        ShelfModel.update (
            {_id: shelfId},
            {$set: newShelf},
            function (err, stats) {
                if(err) {
                    console.log("err: "+err);
                    deferred.reject(err);
                }
                else {
                    ShelfModel.findOne(
                        {_id: shelfId},
                        function (err, shelf) {
                            if(err) {
                                console.log("err: "+err);
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(shelf);
                            }
                        });
                }
            });
        return deferred.promise;
    }
};