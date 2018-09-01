"use strict";
const bcrypt = require('bcrypt');
const sequelizeConnection = require('../sequelize').sequelize;
const User = require('../sequelize').models.user;
const Session = require('../sequelize').models.session;
const Op = require('sequelize').Op;

User.findOneByUsername = function (username) {
    return User.findOne({
        where: {
            username: username
        }
    });
};

User.findOneByEmail = function (email) {
    return User.findOne({
        where: {
            email: email
        }
    });
};

User.findOneByEmailOrUsername = function (value) {
    return User.findOne({
        where: {
            [Op.or]: [
                {
                    email: value
                },
                {
                    username: value
                }]
        }
    });
};

User.prototype.addSession = function (ip) {
    return sequelizeConnection.transaction(t => {
        return Session.create({
            ip: ip,
            date: new Date(),
            userId: this.id
        }, {
                transaction: t
            });
    });
};

User.add = function (username, email, password) {
    return new Promise(function (resolve, reject) {
        bcrypt.hash(password, 10).then(hash => {
            sequelizeConnection.transaction(t => {
                return User.create({
                    username: username,
                    email: email,
                    password: hash,
                    registrationDate: new Date()
                }, {
                        transaction: t
                    });
            }).then(val => {
                resolve(val);
            }).catch(err => {
                reject(err);
            });
        });
    });
}; 

User.prototype.validPassword = function (value) {
    return bcrypt.compare(value, this.password);
};


module.exports = User;