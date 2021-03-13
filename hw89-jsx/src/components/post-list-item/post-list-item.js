import React from 'react';

import './post-list-item.css';

export default class PostListItem extends React.Component {
    render() {
        const {label, important, like, onDelete, onToggleLike, onToggleImportant} = this.props;
        return (
            <div
                className={`app-list-item d-flex justify-content-between ${important ? "important" : ""} ${like ? "like" : ""}`}>
          <span className="app-list-item-label" onClick={() => onToggleLike()}>
              {label}
          </span>
                <div className="d-flex justify-content-between align-items-center">
                    <button type="button" className="btn-star btn-sm" onClick={() => onToggleImportant()}>
                        <i className="bi bi-star-fill"/>
                    </button>
                    <button type="button" className="btn-trash btn-sm" onClick={() => onDelete()}>
                        <i className="bi bi-trash"/>
                    </button>
                    <i className="bi bi-heart-fill"/>
                </div>
            </div>
        );
    }
}