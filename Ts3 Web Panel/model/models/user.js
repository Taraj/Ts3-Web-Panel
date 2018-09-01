"use strict";
const Sequelize = require('sequelize');

module.exports = function (sequelizeConnection) {
    return sequelizeConnection.define('users', {

        login: Sequelize.STRING,

        email: Sequelize.STRING,

        password: Sequelize.STRING,

        googleId: Sequelize.STRING,

        facebookId: Sequelize.STRING,

        registrationDate: Sequelize.DATE

    });
};