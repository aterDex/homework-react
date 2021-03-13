import React from 'react';

import PostListItem from '../post-list-item';
import './post-list.css';

export default class PostList extends React.Component {
    render() {
        const {posts, onDelete, onToggleLike, onToggleImportant} = this.props;
        return (
            <ul className="app-list list-group">
                {posts.map(({id, ...com}) =>
                    <li key={id} className='list-group-item'>
                        <PostListItem {...com}
                                      onDelete={() => onDelete(id)}
                                      onToggleLike={() => onToggleLike(id)}
                                      onToggleImportant={() => onToggleImportant(id)}
                        />
                    </li>
                )}
            </ul>
        );
    }
}