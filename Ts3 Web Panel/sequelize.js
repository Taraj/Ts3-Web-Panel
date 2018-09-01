'use strict';
const Sequelize = require('sequelize');
const fs = require('fs');
const config = require('./config').database;
const path = require('path');

const models = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
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

fs.readdirSync(path.join(__dirname, 'models')).forEach(file => {
    let model = sequelize.import(path.join(path.join(__dirname, 'models'), file));
    models[model.name] = model;
});

Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

module.exports = {
    sequelize: sequelize,
    models: models
};