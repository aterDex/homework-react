import React from 'react';
import {connect} from "react-redux";

import AppHeader from "./app-header";

const AppHeaderRedux = ({total}) => {
    return <AppHeader total={total}/>;
};

const mapStateToProps = (store) => {
    return {
        total: store.priceTotal
    };
}

export default connect(mapStateToProps)(AppHeaderRedux);