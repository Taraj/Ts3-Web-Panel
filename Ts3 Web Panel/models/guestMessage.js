"use strict";
module.exports = function (sequelize, DataTypes) {
    let GuestMessage = sequelize.define('guestMessage', {

        nickname: DataTypes.STRING,

        subject: DataTypes.STRING,

        ip: DataTypes.STRING,

        message: DataTypes.TEXT,

        date: DataTypes.DATE

    });

    return GuestMessage;
};