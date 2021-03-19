import React from 'react';
import {connect} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import actions from "../actions";

const Counter = ({counter, inc, dec}) => {
    return (
        <div className="jumbotron">
            <h1>{counter}</h1>
            <button onClick={() => dec()} className="btn btn-primary">DEC</button>
            <button onClick={() => inc()} className="btn btn-primary">INC</button>
            <button onClick={() => inc(Math.floor(Math.random() * 10))} className="btn btn-primary">RND</button>
        </div>);
}

const mapStateToProps = (state) => {
    return {
        counter: state
    }
}

export default connect(mapStateToProps, actions)(Counter);