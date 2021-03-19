import React from 'react';
import {connect} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import {bindActionCreators} from "redux";
import actions from "../actions";

const Counter = ({counter, inc, dec, rnd}) => {
    return (
        <div className="jumbotron">
            <h1>{counter}</h1>
            <button onClick={dec} className="btn btn-primary">DEC</button>
            <button onClick={inc} className="btn btn-primary">INC</button>
            <button onClick={rnd} className="btn btn-primary">RND</button>
        </div>);
}

const mapStateToProps = (state) => {
    return {
        counter: state
    }
}

const mapDispatchToProps = (dispatch) => {
    const {inc, dec} = bindActionCreators(actions, dispatch);
    return {
        inc: () => inc(),
        dec: () => dec(),
        rnd: () => inc(Math.floor(Math.random() * 10))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);