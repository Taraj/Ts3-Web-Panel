"use strict";
module.exports = function (sequelize, DataTypes) {
    let admin = sequelize.define('admin', {

        nickname: DataTypes.STRING,

        role: DataTypes.STRING,

        uid: DataTypes.STRING,

        avatar: DataTypes.TEXT

    });

    return admin;
};