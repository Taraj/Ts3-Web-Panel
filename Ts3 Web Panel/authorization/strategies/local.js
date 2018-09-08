'use strict';
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const validator = require('validator');
const Op = require('sequelize').Op;

const User = require('../../sequelize').models.user;
const Session = require('../../sequelize').models.session;


module.exports.login = new localStrategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    User.findOne({
        where: {
            [Op.or]: [
                {
                    email: username
                },
                {
                    username: username
                }]
        }
    }).then(user => {
        if (!user) {
            return done(null, false, req.flash('error', 'Nie znaleziono użytkownika.'));
        }
        bcrypt.compare(password, user.password).then(isValidPassword => {
            if (!isValidPassword) {
                return done(null, false, req.flash('error', 'Złe hasło.'));
            }
            Session.create({
                ip: req.ip,
                date: new Date(),
                userId: user.id
            }).then(() => {
                return done(null, user);
            }).catch(err => {
                return done(err);
            });
        }).catch(err => {
            return done(err);
        });
    }).catch(err => {
        return done(err);
    });
});

module.exports.register = new localStrategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    if (!req.body.email) {
        return done(null, false, req.flash('error', 'Wszystkie pola muszą być wypełnione.'));
    }
    if (!validator.isEmail(req.body.email)) {
        return done(null, false, req.flash('error', 'Podaj prawidłowy adres email.'));
    }
    if (!validator.isLength(username, { min: 4, max: 16 })) {
        return done(null, false, req.flash('error', 'Nazwa użytkowika musi mieć od 4 do 16 znaków.'));
    }
    if (!validator.isLength(password, { min: 4, max: 16 })) {
        return done(null, false, req.flash('error', 'Hasło musi mieć od 4 do 16 znaków.'));
    }
    User.findOne({
        where: {
            username: username
        }
    }).then(user => {
        if (user) {
            return done(null, false, req.flash('error', 'Nazwa użytkowika jest już w użyciu.'));
        }
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                return done(null, false, req.flash('error', 'Email jest już w użyciu.'));
            }
            bcrypt.hash(password, 10).then(hash => {
                User.create({
                    username: username,
                    email: req.body.email,
                    password: hash,
                    registrationDate: new Date()
                }).then(user => {
                    Session.create({
                        ip: req.ip,
                        date: new Date(),
                        userId: user.id
                    }).then(() => {
                        return done(null, user);
                    }).catch(err => {
                        return done(err);
                    });
                }).catch(err => {
                    return done(err);
                });
            }).catch(err => {
                return done(err);
            });
        }).catch(err => {
            return done(err);
        });
    }).catch(err => {
        return done(err);
    });
});