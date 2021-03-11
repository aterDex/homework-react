'use strict';

const utils = require('./utils');

function initTimer(dateFinish, timeRefresh = 1000) {
    document.querySelectorAll('.promotion__timeEnd')
        .forEach(x => x.textContent = `${dateFinish.toLocaleDateString()} в ${dateFinish.toLocaleTimeString()}`);

    showTimeRemaining(getTimeRemaining(dateFinish));
    startTimer();

    function startTimer() {
        console.log(`timerStart refresh by ${timeRefresh}`)
        const timerId = setInterval(() => {
            const rem = getTimeRemaining(dateFinish);
            showTimeRemaining(rem);
            if (!(rem.days || rem.hours || rem.minute || rem.seconds)) {
                clearInterval(timerId);
                console.log('timerStop')
            }
        }, timeRefresh);
    }

    function getTimeRemaining(dateFinish) {
        const t = dateFinish - new Date();
        if (t < 0) {
            return {days: 0, hours: 0, minute: 0, seconds: 0};
        }
        return {
            days: Math.floor(t / 86400000),
            hours: Math.floor((t % 86400000) / 3600000),
            minute: Math.floor((t % 86400000 % 3600000) / 60000),
            seconds: Math.floor((t % 86400000 % 3600000 % 60000) / 1000)
        }
    }

    function showTimeRemaining(remaining) {
        document.querySelector('#days').textContent = utils.getZero(remaining.days);
        document.querySelector('#hours').textContent = utils.getZero(remaining.hours);
        document.querySelector('#minutes').textContent = utils.getZero(remaining.minute);
        document.querySelector('#seconds').textContent = utils.getZero(remaining.seconds);
    }
}

module.exports = initTimer;