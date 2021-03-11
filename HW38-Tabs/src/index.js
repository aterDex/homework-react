'use strict';

import {afterDays} from './modules/utils';

import initTabWork from'./modules/tabs';
import initStorage from'./modules/storage';
import initTimer from'./modules/timer';
import initModal from'./modules/modal';
import initMenu from'./modules/menu';
import initSendForm from'./modules/form';
import initSlider from'./modules/slider';
import initCalc from'./modules/calc';

window.addEventListener('DOMContentLoaded', () => {
    const storage = initStorage();
    initTabWork();
    initTimer(afterDays(1));
    const modal = initModal();
    initMenu(storage);
    initSendForm(modal, storage);
    initSlider();
    initCalc();
});








