import React from 'react';
import {connect} from "react-redux";

import AppHeader from "./app-header";

const AppHeaderRedux = ({items = []}) => {
    const total = items.reduce((x, y) => x + +y.price * +y.count, 0);
    return <AppHeader total={total}/>;
};

const mapStateToProps = (store) => {
    return {
        items: store.selectItem
    };
}

export default connect(mapStateToProps)(AppHeaderRedux);