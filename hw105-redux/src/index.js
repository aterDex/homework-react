import {createStore} from 'redux';

import 'bootstrap/dist/css/bootstrap.css';

const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'INC':
            return ++state;
        case 'DEC':
            return --state;
        case 'RND':
            return state + action.rnd;
        default:
            return state;
    }
}
const inc = () => ({type: 'INC'});
const dec = () => ({type: 'DEC'});
const rnd = () => ({type: 'RND', rnd: Math.floor(Math.random() * 10)});


const store = createStore(reducer);
const counter = document.querySelector('#counter');

store.subscribe(() => {
    counter.textContent = store.getState();
})

document.querySelector('#dec').addEventListener('click', () => store.dispatch(dec()));
document.querySelector('#inc').addEventListener('click', () => store.dispatch(inc()));
document.querySelector('#rnd').addEventListener('click', () => store.dispatch(rnd()));