'use strict';
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../../config').passport.google;


const User = require('../../sequelize').models.user;
const Session = require('../../sequelize').models.session;

module.exports.login = new googleStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: "http://localhost/authorization/login/google/callback",
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, profile, done) {
        User.findOne({
            where: {
                googleId: profile.id
            }
        }).then(user => {
            if (!user) {
                return done(null, false, req.flash('error', 'Nie znaleziono uzytkownika'));
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
    }
);

module.exports.connect = new googleStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: "http://localhost/panel/account/connect/google/callback",
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, profile, done) {
        User.findOne({
            where: {
                googleId: profile.id
            }
        }).then(user => {
            if (user) {
                return done(null, req.user, req.flash('error', 'Konto jest już w uzyciu'));
            }
            User.update({
                googleId: profile.id
            }, {
                    where: {
                        id: req.user.id
                    }
                }
            ).then(() => {
                return done(null, req.user, req.flash('success', 'Powiązano z kontem Google.'));
            }).catch(err => {
                return done(err);
            });
        }).catch(err => {
            return done(err);
        });
    }
);