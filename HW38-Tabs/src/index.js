'use strict';

const utils = require('./modules/utils');
const initTabWork = require('./modules/tabs');
const initStorage = require('./modules/storage');
const initTimer = require('./modules/timer');
const initModal = require('./modules/modal');
const initMenu = require('./modules/menu');
const initSendForm = require('./modules/form');
const initSlider = require('./modules/slider');
const initCalc = require('./modules/calc');

window.addEventListener('DOMContentLoaded', () => {
    const storage = initStorage();
    initTabWork();
    initTimer(utils.afterDays(1));
    const modal = initModal();
    initMenu(storage);
    initSendForm(modal, storage);
    initSlider();
    initCalc();
});








