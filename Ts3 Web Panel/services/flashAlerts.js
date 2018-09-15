'use strict';

function flashAlerts(flash) {
    let alertsList = [];
    if (flash.error)
        flash.error.forEach(message => {
            alertsList.push({
                type: 'error',
                message: message
            });
        });
    if (flash.warning)
        flash.warning.forEach(message => {
            alertsList.push({
                type: 'warning',
                message: message
            });
        });
    if (flash.success)
        flash.success.forEach(message => {
            alertsList.push({
                type: 'success',
                message: message
            });
        });
    return alertsList;
}


module.exports = function (app) {
    app.use(function (req, res, next) {
        let alerts = flashAlerts(req.flash());
        if (alerts.length) {
            res.locals.alerts = alerts;
        }
        next();
    });
};
