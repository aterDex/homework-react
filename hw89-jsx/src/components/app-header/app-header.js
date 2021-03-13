import React from 'react';

import './app-header.css';

const AppHeader = ({total, likes}) => {
    return (
        <div className="app-header d-flex">
            <h1>Eugene</h1>
            <h2>{total} записей, из них понравилось {likes}</h2>
        </div>);
}

export default AppHeader;