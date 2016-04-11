
module.exports = function(mongoose) {
    // use mongoose to declare a user schema
    var BookSchema = mongoose.Schema({
        googleBooksId: String,
        title: String,
        authors: [String],
        imageURL: String
    }, {collection: 'project.book'});
    return BookSchema;
};
