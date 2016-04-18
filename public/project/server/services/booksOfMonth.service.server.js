module.exports = function(app, bomModel) {
    app.get("/api/project/booksOfMonth", getBooksOfMonth);
    app.get("/api/project/booksOfMonth?bookId=bookId", getBooksOfMonth);
    app.get("/api/project/booksOfMonth/books", getAllBOMs);
    app.post("/api/project/booksOfMonth", createBOM);
    app.put("/api/project/booksOfMonth/:id", updateBOM);
    app.delete("/api/project/booksOfMonth/:id", deleteBOM);



    function createBOM(req, res){
        var newBOM = req.body;
        bomModel.createBOM(newBOM)
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

    function getAllBOMs(req, res){
        bomModel.getAllBOMs()
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

    function getBooksOfMonth(req, res) {
        if(req.query.bookId) {
            bomModel.getBOMById(req.query.bookId)
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
        else {
            bomModel.getBooksToPublish()
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
    }

    function updateBOM (req, res) {
        var newBOM = req.body;
        bomModel.updateBOMById(req.params.id, newBOM)
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

    function deleteBOM (req, res) {
        bomModel.deleteBOMById(req.params.id)
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

};
