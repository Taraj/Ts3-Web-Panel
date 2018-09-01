"use strict";
const Sequelize = require('sequelize');

module.exports = function (sequelizeConnection) {
    return sequelizeConnection.define('sessions', {

        ip: Sequelize.STRING,

        date: Sequelize.DATE

    });
};