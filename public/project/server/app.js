"use strict";

module.exports = function(app, db, mongoose) {
    var projectUserModel = require("./models/user.model.server.js")(db, mongoose);
    var bookModel = require("./models/book.model.server.js")(db, mongoose);
    var reviewModel = require("./models/review.model.server.js")(db, mongoose);
    var shelfModel = require("./models/shelf.model.server.js")(db, mongoose);

    require("./services/user.service.server.js")(app, projectUserModel);
    require("./services/book.service.server.js")(app, bookModel, shelfModel);
    require("./services/review.service.server.js")(app, reviewModel);
    require("./services/shelf.service.server.js")(app, shelfModel);
};