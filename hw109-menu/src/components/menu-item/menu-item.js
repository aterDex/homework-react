import React from "react";
import MenuListItem from "../menu-list-item";

import "./menu-item.scss"
import WithRestoService from "../hoc";
import {connect} from "react-redux";
import {itemLoaded, itemStatus} from "../../actions";
import Spinner from "../spinner";
import Error from "../error";

class MenuItem extends React.Component {

    componentDidMount() {
        const {itemLoaded, itemStatus, restoService, itemId} = this.props;
        itemStatus('loading');
        restoService.getItem(itemId).then(itemLoaded).catch(() => itemStatus('error'));
    }

    render() {
        const {item, status} = this.props;
        switch (status) {
            case 'loading':
                return <Spinner/>;
            case 'done':
                return (
                    <ul className="menu_s__item">
                        <MenuListItem menuItem={item} withoutLink/>
                    </ul>
                )
            default:
                return <Error/>
        }
    }
}

const mapStateToProps = (store) => {
    return {
        item: store.item,
        status: store.itemStatus
    };
}

const mapDispatchToProps = {
    itemLoaded, itemStatus
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuItem));