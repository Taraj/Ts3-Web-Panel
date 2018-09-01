"use strict";
module.exports = function (sequelize, DataTypes) {
    let Session = sequelize.define('session', {

        ip: DataTypes.STRING,

        date: DataTypes.DATE

    });

    Session.associate = function (models) {
        Session.belongsTo(models.user);
    };

    return Session;
};
