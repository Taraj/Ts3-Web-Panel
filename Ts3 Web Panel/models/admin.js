"use strict";
module.exports = function (sequelize, DataTypes) {
    let Admin = sequelize.define('admin', {

        nickname: DataTypes.STRING,

        role: DataTypes.STRING, 

        avatar: DataTypes.STRING

    });
    Admin.associate = function (models) {
        Admin.hasMany(models.ts3User);
    };
    return Admin;
};