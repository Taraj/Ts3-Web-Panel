'use strict';
const facebookStrategy = require('passport-facebook').Strategy;
const config = require('../../config');


const User = require('../../sequelize').models.user;
const Session = require('../../sequelize').models.session;



module.exports.login = new facebookStrategy({
    clientID: config.passport.facebook.clientID,
    clientSecret: config.passport.facebook.clientSecret,
    callbackURL: "http://" + config.server.adress + "/authorization/login/facebook/callback",
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({
            where: {
                facebookId: profile.id
            }
        }).then(user => {
            if (!user) {
                return done(null, false, req.flash('error', 'Nie znaleziono użytkownika.'));
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

module.exports.connect = new facebookStrategy({
    clientID: config.passport.facebook.clientID,
    clientSecret: config.passport.facebook.clientSecret,
    callbackURL: "http://" + config.server.adress + "/panel/account/connect/facebook/callback",
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, profile, done) {
        User.findOne({
            where: {
                facebookId: profile.id
            }
        }).then(user => {
            if (user) {
                return done(null, req.user, req.flash('error', 'Konto jest już w uzyciu'));
            }
            User.update({
                facebookId: profile.id,
                facebookDisplayName:profile.displayName
            }, {
                    where: {
                        id: req.user.id
                    }
                }
            ).then(() => {
                return done(null, req.user, req.flash('success', 'Powiązano z kontem Facebook.'));
            }).catch(err => {
                return done(err);
            });
        }).catch(err => {
            return done(err);
        });
    }
);