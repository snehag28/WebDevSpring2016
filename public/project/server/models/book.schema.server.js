
module.exports = function(mongoose) {
    // use mongoose to declare a user schema
    var BookSchema = mongoose.Schema({
        //googleBooksId: String,
        googleBooksId: String,
        title: String,
        authors: [String],
        imageURL: String,
        userShelf: [{
            userId: String,
            rating: Number,
            shelf: {
                type: String,
                enum: [ 'read',
                        'to-read',
                        'currently-reading'
                ]
            }
        }]
    }, {collection: 'project.book'});
    return BookSchema;
};
