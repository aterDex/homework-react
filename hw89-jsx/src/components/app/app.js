import React from 'react';
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './app.css';
import {v4} from "uuid";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [
                {id: v4(), label: "Going to learn React", important: true, like: false},
                {id: v4(), label: "That is so good", important: false, like: true},
                {id: v4(), label: "I need a break...", important: false, like: false}],
            filter: "All",
            search: ""
        }
        this.removeById = this.removeById.bind(this);
        this.changedFieldById = this.changedFieldById.bind(this);
        this.addPost = this.addPost.bind(this);
    }

    countLikes() {
        return this.state.posts.reduce((x, y) => x + +y.like, 0);
    }

    removeById(id) {
        let find = false;
        this.setState(({posts}) => ({posts: posts.filter(x => find || !(find = x.id === id))}));
    }

    changedFieldById(id, callback) {
        let find = false;
        this.setState(({posts}) => ({posts: posts.map(x => !find && (find = x.id === id) ? callback(x) : x)}));
    }

    addPost(text) {
        this.setState(({posts}) => ({posts: [...posts, {id: v4(), label: text, important: false, like: false}]}));
    }

    searchPost(posts, search) {
        return search ? posts.filter(x => x.label.indexOf(search) > -1) : posts;
    }

    filterPost(posts, filter) {
        return filter === 'All' ? posts : posts.filter(x => x.like);
    }

    render() {
        const {posts, filter, search} = this.state;
        const visiblePosts = this.filterPost(this.searchPost(posts, search), filter);
        return (
            <div className="app">
                <AppHeader total={posts.length} likes={this.countLikes()}/>
                <div className="search-panel d-flex">
                    <SearchPanel onSearch={x => this.setState({search: x})}/>
                    <PostStatusFilter filter={filter} onFilter={(x) => this.setState({filter: x})}/>
                </div>
                <PostList posts={visiblePosts}
                          onDelete={this.removeById}
                          onToggleLike={id => this.changedFieldById(id, x => ({...x, like: !x.like}))}
                          onToggleImportant={id => this.changedFieldById(id, x => ({...x, important: !x.important}))}
                />
                <PostAddForm onAdd={this.addPost}/>
            </div>
        );
    }
}