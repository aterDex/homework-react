import * as eventTypes from './eventTypes';

const initialState = {
    menu: []
}

const reducer = (state = initialState, action) => {
    console.log("event: ", state, "====", action);
    const {type, payload} = action;
    switch (type) {
        case eventTypes.ET_RESTO_MENU_LOADED:
            return {
                menu: payload
            }
        default:
            return state;
    }
}

export default reducer;