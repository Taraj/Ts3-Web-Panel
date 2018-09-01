'use strict';
const localStrategy = require('passport-local').Strategy;
const User = require('../../repositories/user');
const validator = require('validator');

module.exports.login = new localStrategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    User.findOneByEmailOrUsername(username).then(user => {
        if (!user) {
            return done(null, false, req.flash('error', 'Nie znaleziono użytkownika'));
        }
        user.validPassword(password).then(isValidPassword => {
            if (!isValidPassword) {
                return done(null, false, req.flash('error', 'Złe hasło'));
            }
            user.addSession(req.ip).then(() => {
                return done(null, user.dataValues);
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
        return done(null, false, req.flash('error', 'Podaj prawidłowy email.'));
    }
    if (!validator.isLength(username, { min: 4, max: 16 })) {
        return done(null, false, req.flash('error', 'Nazwa użytkowika musi mieć od 4 do 16 znaków.'));
    }
    if (!validator.isLength(password, { min: 4, max: 16 })) {
        return done(null, false, req.flash('error', 'Haslo musi mieć od 4 do 16 znaków.'));
    }
    User.findOneByUsername(username).then(user => {
        if (user) {
            return done(null, false, req.flash('error', 'Nazwa użytkowika jest już w użyciu.'));
        }
        User.findOneByEmail(req.body.email).then(user => {
            if (user) {
                return done(null, false, req.flash('error', 'Email jest już w użyciu.'));
            }       
            User.add(username, req.body.email, password).then(user => {
                user.addSession(req.ip).then(() => {
                    return done(null, user.dataValues);
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