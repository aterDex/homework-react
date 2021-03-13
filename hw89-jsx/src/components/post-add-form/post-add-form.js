import React from 'react';

import './post-add-form.css';

export default class PostAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.text);
        this.setState({
            text: ''
        });
    }

    render() {
        return (
            <form className="bottom-panel d-flex" onSubmit={this.onSubmit}>
                <input type="text"
                       placeholder="О чем вы думаете сейчас?"
                       className="form-control new-post-label"
                       value={this.state.text}
                       onChange={x => this.setState({text: x.target.value})}
                />
                <button type="submit" className="btn btn-outline-secondary">
                    Добавить
                </button>
            </form>
        );
    }
}