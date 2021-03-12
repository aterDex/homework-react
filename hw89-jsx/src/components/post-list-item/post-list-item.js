import React from 'react';

import './post-list-item.css';

const PostListItem = () => {
    return (
        <li className="app-list-item d-flex justify-content-between">
          <span className="app-list-item-label">
              Hello World!
          </span>
            <div className="d-flex justify-content-between align-items-center">
                <button type="button" className="btn-star btn-sm">
                    <i className="bi bi-star"></i>
                </button>
                <button type="button" className="btn-trash btn-sm">
                    <i className="bi bi-trash"></i>
                </button>
                <i className="bi bi-heart"></i>
            </div>
        </li>
    );
}

export default PostListItem;