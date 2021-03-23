import React from "react";
import MenuListItem from "../menu-list-item";

import "./menu-item.scss"
import WithRestoService from "../hoc";
import {connect} from "react-redux";
import {itemLoaded, itemStatus, selectItemAdd} from "../../actions";
import Spinner from "../spinner";
import Error from "../error";

class MenuItem extends React.Component {

    componentDidMount() {
        const {itemLoaded, itemStatus, restoService, itemId} = this.props;
        itemStatus('loading');
        restoService.getItem(itemId).then(itemLoaded).catch(() => itemStatus('error'));
    }

    render() {
        const {item, status, selectItemAdd} = this.props;
        switch (status) {
            case 'loading':
                return <Spinner/>;
            case 'done':
                return (
                    <ul className="menu_s__item">
                        <MenuListItem menuItem={item} withoutLink onAddCard={selectItemAdd}/>
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
    itemLoaded, itemStatus, selectItemAdd
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuItem));