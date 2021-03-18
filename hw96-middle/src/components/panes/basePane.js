import React from 'react';

import './basePane.css';

export default class BasePane extends React.Component {
    render() {
        return (<div className="base-pane-style rounded">
            {this.props.children}
        </div>)
    }
}