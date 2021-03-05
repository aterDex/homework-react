'use strict';

window.addEventListener('DOMContentLoaded', () => {
    initTabWork();
    initTimer(afterDays(1));
    initModal();
});

function initTabWork() {

    const ST_TABHEADER_ITEM_ACTIVE = 'tabheader__item_active';

    const tabHeaders = document.querySelectorAll('.tabheader__item'),
        tabContents = document.querySelectorAll('.tabcontent'),
        tabPane = document.querySelector('.tabheader');

    hideTabAll();
    showTab();

    tabPane.addEventListener('click', e => {
        const t = e.target;
        if (t && t.classList.contains('tabheader__item')) {
            let i = 0;
            for (let e of tabHeaders) {
                if (t === e) {
                    hideTabAll();
                    showTab(i);
                }
                i++;
            }
        }
    });

    function hideTabAll() {
        tabContents.forEach(x => x.hidden = true);
        tabHeaders.forEach(x => x.classList.remove(ST_TABHEADER_ITEM_ACTIVE))
    }

    function showTab(i = 0) {
        tabContents[i].hidden = false;
        tabHeaders[i].classList.add(ST_TABHEADER_ITEM_ACTIVE);
    }
}

function afterDays(days) {
    const now = new Date();
    now.setDate(now.getDate() + days);
    return now;
}

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
        document.querySelector('#days').textContent = getZero(remaining.days);
        document.querySelector('#hours').textContent = getZero(remaining.hours);
        document.querySelector('#minutes').textContent = getZero(remaining.minute);
        document.querySelector('#seconds').textContent = getZero(remaining.seconds);
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        }
        return num;
    }
}

function initModal() {
    const modal = document.querySelector('.modal');

    document.querySelectorAll('[data-modal]').forEach(x => x.addEventListener('click', showModal));
    document.querySelectorAll('[data-modalClose]').forEach(x => x.addEventListener('click', hideModal));

    modal.addEventListener('click', e => {
        if (e.target === modal) {
            hideModal();
        }
    });

    document.addEventListener('keydown', e => {
        if (e.code === 'Escape' && !modal.hidden) {
            hideModal();
        }
    });

    function showModal() {
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        modal.hidden = true;
        document.body.style.overflow = '';
    }
}