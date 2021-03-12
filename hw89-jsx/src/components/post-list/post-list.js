import React from 'react';

import PostListItem from '../post-list-item';
import './post-list.css';

export default class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: props.posts
        }
        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    onDelete(id) {
        this.setState(({posts}) => {
            return {
                posts: posts.filter(x => x.id !== id)
            }
        });
    }

    onAdd(post) {
        this.setState(({posts}) => {
            return {
                posts: [...posts, post]
            }
        });
    }

    render() {
        return (
            <ul className="app-list list-group">
                {this.state.posts.map(({id, ...com}) =>
                    <li key={id} className='list-group-item'>
                        <PostListItem {...com} onDelete={() => this.onDelete(id)}/>
                    </li>
                )}
            </ul>
        );
    }
}