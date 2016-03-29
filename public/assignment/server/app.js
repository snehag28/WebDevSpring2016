"use strict";

module.exports = function(app, db, mongoose) {

    // pass db and mongoose reference to models
    var formUserModel = require("./models/user.model.server.js")(db, mongoose);
    require("./services/user.service.server.js")(app, formUserModel);

    var formModel = require("./models/form.model.server.js")(db, mongoose);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, formModel);

};