import * as eventTypes from '../reducers/eventTypes';

const menuLoaded = (newMenu) => {
    return {
        type: eventTypes.ET_RESTO_MENU_LOADED,
        payload: newMenu
    };
};

const menuStatus = (newStatus) => {
    return {
        type: eventTypes.ET_RESTO_MENU_STATUS,
        payload: newStatus
    };
};

const itemLoaded = (newItem) => {
    return {
        type: eventTypes.ET_RESTO_ITEM_LOADED,
        payload: newItem
    };
};

const itemStatus = (newStatus) => {
    return {
        type: eventTypes.ET_RESTO_ITEM_STATUS,
        payload: newStatus
    };
};

export {
    menuLoaded,
    menuStatus,
    itemLoaded,
    itemStatus
};