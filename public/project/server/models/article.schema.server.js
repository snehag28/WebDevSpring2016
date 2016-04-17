module.exports = function(mongoose) {
    // use mongoose to declare a user schema
    var ArticleSchema = mongoose.Schema({
        username: String,
        title: String,
        content: String,
        imageURL: String,
        publish: Boolean,
        read: Boolean,
        type: {
            type: String,
            enum: ['user',
                'editor']},
        dateSubmitted: { type: Date, default: Date.now }
    }, {collection: 'project.article'});
    return ArticleSchema;
};
