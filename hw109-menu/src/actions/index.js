import * as eventTypes from '../reducers/eventTypes';

const menuLoaded = (newMenu) => {
    return {
        type: eventTypes.ET_RESTO_MENU_LOADED,
        payload: newMenu
    };
};

export {
    menuLoaded
};