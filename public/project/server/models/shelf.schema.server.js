module.exports = function(mongoose) {
    // use mongoose to declare a user schema
    var ShelfSchema = mongoose.Schema({
        googleBooksId: String,
        userId: String,
        rating: Number,
        shelf: {
            type: String,
            enum: [ 'read',
                'to-read',
                'currently-reading'
            ]
        },
        dateRead: { type: Date, default: Date.now }
    }, {collection: 'project.shelf'});
    return ShelfSchema;
};