import React from 'react';

import './post-list-item.css';

export default class PostListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            important: props.important,
            like: false
        };
        this.onImportant = this.onImportant.bind(this);
        this.onLike = this.onLike.bind(this);
    }

    onImportant() {
        this.setState(({important}) => ({important: !important}));
    }

    onLike() {
        this.setState(({like}) => ({like: !like}));
    }

    render() {
        const {label, onDelete} = this.props;
        const {important, like} = this.state;
        return (
            <div
                className={`app-list-item d-flex justify-content-between ${important ? "important" : ""} ${like ? "like" : ""}`}>
          <span className="app-list-item-label" onClick={this.onLike}>
              {label}
          </span>
                <div className="d-flex justify-content-between align-items-center">
                    <button type="button" className="btn-star btn-sm" onClick={this.onImportant}>
                        <i className="bi bi-star-fill"/>
                    </button>
                    <button type="button" className="btn-trash btn-sm" onClick={onDelete}>
                        <i className="bi bi-trash"/>
                    </button>
                    <i className="bi bi-heart-fill"/>
                </div>
            </div>
        );
    }
}