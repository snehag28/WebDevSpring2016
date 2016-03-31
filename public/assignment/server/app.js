"use strict";

module.exports = function(app, db, mongoose) {

    // pass db and mongoose reference to models
    var formUserModel = require("./models/user.model.server.js")(db, mongoose);
    var formModel = require("./models/form.model.server.js")(db, mongoose);
    var fieldModel = require("./models/field.model.server.js")(db, mongoose);

    var UserService = require("./services/user.service.server.js")(app, formUserModel);
    var FormService = require("./services/form.service.server.js")(app, fieldModel, formModel);
    var FieldService = require("./services/field.service.server.js")(app, fieldModel, formModel);

};