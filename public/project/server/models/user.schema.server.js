
module.exports = function(mongoose) {
    // use mongoose to declare a user schema
    var ProjectUserSchema = mongoose.Schema({
        //_id: String,
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        dateOfBirth: Date,
        gender: {
            type: String,
            enum: ['male',
                'female']},
        following: [String],
        followers: [String],
        aboutMe: String,
        favoriteBooks: String

        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.user'});
    return ProjectUserSchema;
};
