import React from 'react';
import './itemList.css';
import Spinner from "../spinner";
import PropTypes from "prop-types";

export default class ItemList extends React.Component {

    static props = {
        onItemSelected: () => {
        },
        renderItem: () => {
        }
    }

    static propTypes = {
        onItemSelected: PropTypes.func,
        renderItem: PropTypes.func,
        onData: PropTypes.func.isRequired
    }

    state = {
        itemList: null
    }

    componentDidMount() {
        const {onData} = this.props;
        onData()
            .then(itemList => {
                this.setState({itemList});
            }).catch(e => this.onError(e));
    }

    onError(e) {
        this.props.onError(e);
    }

    render() {
        const {onItemSelected} = this.props;
        const {renderItem} = this.props;
        const {itemList} = this.state;

        const wait = itemList ? null : (<li key="spinner_li_qcdkpwe21" className="list-group-item"><Spinner/></li>)
        const body = itemList ? itemList.map(item => <ItemView key={item.id} item={item} renderItem={renderItem}
                                                               onClick={x => onItemSelected(x)}/>) : null;
        return (
            <ul className="item-list list-group">
                {wait}
                {body}
            </ul>
        );
    }
}

const ItemView = ({item, onClick, renderItem}) => {
    return (<li className="list-group-item" onClick={x => onClick(item)}>{renderItem(item)}</li>)
}