'use strict';
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../../config');


const User = require('../../sequelize').models.user;
const Session = require('../../sequelize').models.session;

module.exports.login = new googleStrategy({
    clientID: config.passport.google.clientID,
    clientSecret: config.passport.google.clientSecret,
    callbackURL: "http://" + config.server.adress + "/authorization/login/google/callback",
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, profile, done) {
        console.log(profile);
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
    clientID: config.passport.google.clientID,
    clientSecret: config.passport.google.clientSecret,
    callbackURL: "http://" + config.server.adress + "/panel/account/connect/google/callback",
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
                googleId: profile.id,
                   googleDisplayName: profile.displayName
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