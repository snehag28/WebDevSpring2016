
module.exports = function(mongoose) {
    // use mongoose to declare a user schema
    var BookSchema = mongoose.Schema({
        //googleBooksId: String,
        id: String,
        title: String,
        authors: [String],
        imageURL: String,
        rating: Number,
        shelf: {
            type: String,
            enum: [ 'read',
                    'to-read',
                    'currently-reading']},
        userId: String

    }, {collection: 'project.book'});
    return BookSchema;
};
