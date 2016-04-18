
module.exports = function(mongoose) {
    // use mongoose to declare a user schema
    var BOMSchema = mongoose.Schema({
        googleBooksId: String,
        imageURL: String,
        title: String,
        editorialDescription: String,
        authors: [String],
        publish: Boolean
    }, {collection: 'project.booksOfMonth'});
    return BOMSchema;
};