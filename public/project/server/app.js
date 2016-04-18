
"use strict";

module.exports = function(app, db, mongoose) {
    var projectUserModel = require("./models/user.model.server.js")(db, mongoose);
    require("./services/user.service.server.js")(app, projectUserModel);

    var bookModel = require("./models/book.model.server.js")(db, mongoose);
    require("./services/book.service.server.js")(app, bookModel);

    var reviewModel = require("./models/review.model.server.js")(db, mongoose);
    require("./services/review.service.server.js")(app, reviewModel);

    var articleModel = require("./models/article.model.server.js")(db, mongoose);
    require("./services/article.service.server.js")(app, articleModel);

    var BomModel = require("./models/booksOfMonth.model.server.js")(db, mongoose);
    require("./services/booksOfMonth.service.server.js")(app, BomModel);
};