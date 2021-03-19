const actions = {
    inc: (value = 1) => ({type: 'INC', value}),
    dec: (value = 1) => ({type: 'DEC', value}),
}

export default actions;