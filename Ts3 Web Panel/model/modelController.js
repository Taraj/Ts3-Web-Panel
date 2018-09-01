"use strict";
const sequelizeConnection = require("./sequelizeConnection");


const user = require("./models/user")(sequelizeConnection);
const session = require("./models/session")(sequelizeConnection);


session.belongsTo(user);
user.hasMany(session);






module.exports.user = user;


module.exports.sync = function () {
    return sequelizeConnection.sync();
};