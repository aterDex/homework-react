import React, {Component} from 'react';
import Error from '../error';

export default class ErrorBoundary extends Component {

    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({error: true});
    }

    render() {
        const {error} = this.state;
        if (error) {
            return <Error/>
        }
        return this.props.children;
    }
}