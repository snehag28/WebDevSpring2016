module.exports = function(app, reviewModel) {
    app.get("/api/project/review/:bookId", getAllReviews);
    app.post("/api/project/review", addReview);

    function getAllReviews(req, res){
        reviewModel.findReviewsForBook(req.params.bookId)
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

    function addReview(req, res){
        var review = req.body;
        reviewModel.createReview(review)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    //req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }
};