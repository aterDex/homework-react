import React from 'react';
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './app.css';

const App = () => {

    const data = [
        {id: "a4b8a4ad-dc20-4294-9d0e-0f8e2411c713", label: "Going to learn React", important: true},
        {id: "12cdb556-7e13-4f78-bd4d-b6c1d82bb0e9", label: "That is so good", important: false},
        {id: "bb73b6d6-cc9d-4566-8504-5c40f29d9ed1", label: "I need a break...", important: false}
    ];
    const pl = <PostList posts={data}
                         onDelete={(x) => console.log(x)}/>
    return (
        <div className="app">
            <AppHeader/>
            <div className="search-panel d-flex">
                <SearchPanel/>
                <PostStatusFilter/>
            </div>
            {pl}
            <PostAddForm/>
        </div>
    );
}

export default App;