'use strict';
const home = require('./routes/home');
const authorization = require('./routes/authorization');
const panel = require('./routes/panel');
const account = require('./routes/account');


module.exports = function (app) {
    app.use('/', home);
    app.use('/authorization', authorization);
    app.use('/panel', panel);
    app.use('/panel/account', account);
};