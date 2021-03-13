import React from 'react';

import './post-status-filter.css';

const PostStatusFilter = ({filter, onFilter}) => {
    return (
        <div className="btn-group">
            <button type='button' className={`btn ${filter === "All" ? "btn-info" : "btn-outline-secondary"}`} onClick={x => onFilter("All")}>Все</button>
            <button type='button' className={`btn ${filter === "Like" ? "btn-info" : "btn-outline-secondary"}`} onClick={x => onFilter("Like")}>Понравилось</button>
        </div>
    );
}

export default PostStatusFilter;