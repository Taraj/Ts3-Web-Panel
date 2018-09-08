"use strict";
module.exports = function (sequelize, DataTypes) {
    let Ts3User = sequelize.define('ts3User', {
        globalId: DataTypes.STRING,

        databaseId: DataTypes.INTEGER,

        lastNickname: DataTypes.STRING,

        firstConnection: DataTypes.DATE,

        totalConnections: DataTypes.INTEGER,

        totalConnectionsTime: DataTypes.INTEGER,

        totalAfkTime: DataTypes.INTEGER,

        online: DataTypes.BOOLEAN
    });

    Ts3User.associate = function (models) {
        Ts3User.belongsTo(models.admin);
    };

    return Ts3User;
};