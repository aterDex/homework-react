'use strict';

import {afterDays} from './modules/utils';
import initTabWork from'./modules/tabs';
import initTimer from'./modules/timer';
import initModal from'./modules/modal';
import initMenu from'./modules/menu';
import initSendForm from'./modules/form';
import initSlider from'./modules/slider';
import initCalc from'./modules/calc';

window.addEventListener('DOMContentLoaded', () => {
    initTabWork();
    initTimer(afterDays(1));
    const modal = initModal();
    initMenu();
    initSendForm(modal);
    initSlider();
    initCalc();
});








