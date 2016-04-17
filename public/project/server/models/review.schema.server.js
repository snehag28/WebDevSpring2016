module.exports = function(mongoose) {
    // use mongoose to declare a user schema
    var ReviewSchema = mongoose.Schema({
        googleBooksId: String,
        username: String,
        comment: String,
        dateAdded: { type: Date, default: Date.now }
    }, {collection: 'project.review'});
    return ReviewSchema;
};
