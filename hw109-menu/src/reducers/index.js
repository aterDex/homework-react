import * as eventTypes from './eventTypes';

const initialState = {
    menu: [],
    status: 'loading',
    item: undefined,
    itemStatus: 'loading',
    selectItem: []
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
        case eventTypes.ET_RESTO_SELECT_ITEM_ADD:
            const f = state.selectItem.find(x => x.id === payload.id);
            let si;
            if (f) {
                si = state.selectItem.map(x => x !== f ? x : {...x, count: x.count + 1});
            } else {
                si = [...state.selectItem, itemToSelectItem(payload)];
            }

            return {
                ...state,
                selectItem: si
            };
        case eventTypes.ET_RESTO_SELECT_ITEM_DELETE:
            const remove = action.count;
            if (remove && remove > 0) {
                const f = state.selectItem.find(x => x.id === payload.id);
                console.log("rem", remove, f.count);
                if (remove < f.count) {
                    return {
                        ...state,
                        selectItem: state.selectItem.map(x => x !== f ? x : {...x, count: x.count - remove})
                    };
                }
            }
            return {
                ...state,
                selectItem: state.selectItem.filter(x => x.id !== payload.id)
            };
        default:
            return state;
    }
}

function itemToSelectItem(item) {
    return {
        title: item.title,
        price: item.price,
        url: item.url,
        id: item.id,
        count: 1
    }
}

export default reducer;