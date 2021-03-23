import React from 'react';
import {connect} from "react-redux";

import {selectItemAllDel} from "../../actions";
import AppHeader from "./app-header";
import WithRestoService from "../hoc";

const AppHeaderRedux = ({total, selectItemAllDel, restoService, items}) => {
    return <AppHeader total={total} onBuy={() => {
        restoService
            .buy(items)
            .then(() => selectItemAllDel());
    }}/>;
};

const mapStateToProps = (store) => {
    return {
        total: store.priceTotal,
        items: store.selectItem
    };
}

export default WithRestoService()(connect(mapStateToProps, {selectItemAllDel})(AppHeaderRedux));