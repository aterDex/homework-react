export default class MessagesModel {

    _data;
    _search;
    _filter;
    _callbacks=[];

    constructor() {
        this._data = [{id: "a4b8a4ad-dc20-4294-9d0e-0f8e2411c713", label: "Going to learn React", important: true, like: false},
            {id: "12cdb556-7e13-4f78-bd4d-b6c1d82bb0e9", label: "That is so good", important: false, like: false},
            {id: "bb73b6d6-cc9d-4566-8504-5c40f29d9ed1", label: "I need a break...", important: false, like: false}]
        this._filter = 'All';
    }

    addNewPost(text) {
    }

    like(id) {
    }

    important(id) {
    }

    data() {
        return this._data;
    }

    addListener(callback) {
        this._callbacks.push(callback)
    }
}