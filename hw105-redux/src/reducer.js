const reducer = (state = 0,  {type, value}) => {
    switch (type) {
        case 'INC':
            return state + value;
        case 'DEC':
            return state - value;
        default:
            return state;
    }
}

export default reducer;