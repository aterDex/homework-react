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

const selectItemAdd = (add) => {
    return {
        type: eventTypes.ET_RESTO_SELECT_ITEM_ADD,
        payload: add
    };
};

const selectItemDel = (delId, count = 0) => {
    return {
        type: eventTypes.ET_RESTO_SELECT_ITEM_DELETE,
        payload: delId,
        count: count
    };
};

export {
    menuLoaded,
    menuStatus,
    itemLoaded,
    itemStatus,
    selectItemAdd,
    selectItemDel
};