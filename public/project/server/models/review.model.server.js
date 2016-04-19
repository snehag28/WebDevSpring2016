
// load q promise library
var q = require("q");

module.exports = function(db, mongoose) {

    // load review schema
    var ReviewSchema = require("./review.schema.server.js")(mongoose);

    // create book model from schema
    var ReviewModel = mongoose.model('ReviewModel', ReviewSchema);

    var api = {
        createReview: createReview,
        findReviewsForUser: findReviewsForUser,
        findReviewsForBook: findReviewsForBook,
        deleteReviewById: deleteReviewById,
        updateReviewById: updateReviewById
    };
    return api;

    function createReview(review) {
        var deferred = q.defer();

        ReviewModel.create(review, function (err, doc) {
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

    function findReviewsForUser(userId) {
        var deferred = q.defer();

        ReviewModel.find(
            {userId: userId},
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

    function findReviewsForBook(bookId) {
        var deferred = q.defer();

        ReviewModel.find(
            {googleBooksId: bookId},
            null,
            {sort: {dateAdded: -1}},
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

    function deleteReviewById(reviewId) {
        var deferred = q.defer();

        // remove user with mongoose user model's remove()
        ReviewModel.remove(
            {_id: reviewId},
            function(err, stats) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    //deferred.resolve(findAllUsers());
                    deferred.resolve();
                }
            });
        return deferred.promise;
    }

    function updateReviewById(reviewId, changedReview) {
        var deferred = q.defer();
        var newReview = {
            googleBooksId: changedReview.googleBooksId,
            username: changedReview.username,
            comment: changedReview.comment,
            dateAdded: changedReview.dateAdded
        };
        ReviewModel.update (
            {_id: reviewId},
            {$set: newReview},
            function (err, stats) {
                if(err) {
                    console.log("err: "+err);
                    deferred.reject(err);
                }
                else {
                    ReviewModel.findOne(
                        {_id: reviewId},
                        function (err, review) {
                            if(err) {
                                console.log("err: "+err);
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(review);
                            }
                        });
                }
            });
        return deferred.promise;
    }
};