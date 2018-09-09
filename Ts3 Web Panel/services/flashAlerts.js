'use strict';

module.exports = function (flash) {
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