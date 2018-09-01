'use strict';
const Sequelize = require('sequelize');
const config = require('../config').database;

module.exports = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    },
    operatorsAliases: false,
    define: {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
});