
module.exports = function(mongoose) {
    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        _id: String,
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String]
        // collection property sets
        // collection name to 'user'
    }, {collection: 'assignment.user'});
    return UserSchema;
};
