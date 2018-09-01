'use strict';
const home = require('./routes/home');
const authorization = require('./routes/authorization');


module.exports = function (app) {
    app.use("/", home);
    app.use("/authorization", authorization);
};