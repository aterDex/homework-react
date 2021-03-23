import * as eventTypes from './eventTypes';

const initialState = {
    menu: [],
    status: 'loading',
    item: undefined,
    itemStatus: 'loading'
}

const reducer = (state = initialState, action) => {
    console.log("event: ", state, "====", action);
    const {type, payload} = action;
    switch (type) {
        case eventTypes.ET_RESTO_MENU_LOADED:
            return {
                ...state,
                menu: payload,
                status: 'done'
            };
        case eventTypes.ET_RESTO_MENU_STATUS:
            return {
                ...state,
                status: payload
            };
        case eventTypes.ET_RESTO_ITEM_LOADED:
            return {
                ...state,
                item: payload,
                itemStatus: 'done'
            };
        case eventTypes.ET_RESTO_ITEM_STATUS:
            return {
                ...state,
                itemStatus: payload
            };
        default:
            return state;
    }
}

export default reducer;