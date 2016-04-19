
// load q promise library
var q = require("q");

module.exports = function(db, mongoose) {

    // load review schema
    var ArticleSchema = require("./article.schema.server.js")(mongoose);

    // create book model from schema
    var ArticleModel = mongoose.model('ArticleModel', ArticleSchema);

    var api = {
        getEditorArticleToPublish: getEditorArticleToPublish,
        getArticleById: getArticleById,
        createArticle: createArticle,
        updateArticle: updateArticle,
        getAllEditorials: getAllEditorials,
        deleteArticleById: deleteArticleById
    };
    return api;

    function getAllEditorials() {
        var deferred = q.defer();
        ArticleModel.find(
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

    function getEditorArticleToPublish() {
        var deferred = q.defer();
        ArticleModel.findOne(
            {
                publish: true,
                type: "editor"
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

    function getArticleById(id) {
        var deferred = q.defer();
        ArticleModel.findById(
            {
                _id: id
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

    function createArticle(article) {
        var deferred = q.defer();

        ArticleModel.create(article, function (err, doc) {

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

    function updateArticle(articleId, article) {
        var deferred = q.defer();
        var newArticle = {
            username: article.username,
            title: article.title,
            content: article.content,
            imageURL: article.imageURL,
            publish: article.publish,
            read: article.read,
            type: article.type,
            dateSubmitted: article.dateSubmitted
        };

        ArticleModel.update (
            {_id: articleId},
            {$set: newArticle},
            function (err, stats) {
                if(err) {
                    console.log("err: "+err);
                    deferred.reject(err);
                }
                else {
                    ArticleModel.findById(articleId,
                        function (err, changedArticle) {
                            if(err) {
                                console.log("err: "+err);
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(changedArticle);
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function deleteArticleById(articleId) {
        var deferred = q.defer();

        ArticleModel.remove(
            {_id: articleId},
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