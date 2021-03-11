'use strict';

function afterDays(days) {
    const now = new Date();
    now.setDate(now.getDate() + days);
    return now;
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return '0' + num;
    }
    return num;
}

module.exports = {
    afterDays: afterDays,
    getZero: getZero
}