import React, {Component} from 'react';
import {connect} from 'react-redux';
import MenuListItem from '../menu-list-item';
import WithRestoService from '../hoc';
import Spinner from "../spinner";

import {menuLoaded, menuStatus} from "../../actions";

import './menu-list.scss';
import Error from "../error";

class MenuList extends Component {

    componentDidMount() {
        const {menuLoaded, menuStatus, restoService} = this.props;
        menuStatus('loading');
        restoService.getMenuItems().then(menuLoaded).catch(() => menuStatus('error'));
    }

    render() {
        const {menuItems, status} = this.props;
        switch (status) {
            case 'loading':
                return <Spinner/>;
            case 'done':
                return (
                    <>
                        <ul className="menu__list">
                            {menuItems.map(x => <MenuListItem key={x.id} menuItem={x}/>)}
                        </ul>
                    </>
                );
            default:
                return <Error/>
        }
    }
};

const mapStateToProps = (store) => {
    return {
        menuItems: store.menu,
        status: store.status
    };
}

const mapDispatchToProps = {
    menuLoaded, menuStatus
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));