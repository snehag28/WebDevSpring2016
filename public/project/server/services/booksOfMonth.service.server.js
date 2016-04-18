module.exports = function(app, bomModel) {
    app.get("/api/project/booksOfMonth", getBooksOfMonth);
    app.get("/api/project/booksOfMonth?bookId=bookId", getBooksOfMonth);

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

};
