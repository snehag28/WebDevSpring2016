module.exports = function(app, articleModel) {
    app.get("/api/project/editor/article", getEditorial);
    app.get("/api/project/editor/:id", getArticleById);
    app.post("/api/project/article", addArticle);
    app.put("/api/project/article/:id", updateArticle);

    function getEditorial(req, res){
        articleModel.getEditorArticleToPublish()
            .then(
                // return user if promise resolved
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getArticleById(req, res){
        articleModel.getArticleById(req.params.id)
            .then(
                // return user if promise resolved
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addArticle(req, res){
        var newArticle = req.body;
        articleModel.createArticle(newArticle)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateArticle (req, res) {
        var newArticle = req.body;
        articleModel.updateArticle(req.params.id, newArticle)
            .then(
                function ( book ) {
                    res.json(book);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );

    }
};