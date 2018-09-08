'use strict';
const User = require('../sequelize').models.user;
const localStrategy = require('./strategies/local');


module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id).then(user => {
            if (user) {
                done(null, user);
            } else {
                done(new Error("User doesn't exist"));
            }
        }).catch(err => {
            done(err);
        });
    });


    passport.use('register-local', localStrategy.register);
    passport.use('login-local', localStrategy.login);
};