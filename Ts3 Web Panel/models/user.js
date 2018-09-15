"use strict";
module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define('user', {

        username: DataTypes.STRING,

        email: DataTypes.STRING,

        password: DataTypes.STRING,

        googleId: DataTypes.STRING,

        googleDisplayName: DataTypes.STRING,

        facebookId: DataTypes.STRING,

        facebookDisplayName: DataTypes.STRING,

        registrationDate: DataTypes.DATE

    });

    User.associate = function (models) {
        User.hasMany(models.session);
    };

    return User;
};