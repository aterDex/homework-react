import React from 'react';
import './itemList.css';
import Spinner from "../spinner";
import PropTypes from "prop-types";

class ItemList extends React.Component {
    render() {
        const {onItemSelected, renderItem, data} = this.props;
        const body = data ? data.map(item => <ItemView key={item.id} item={item} renderItem={renderItem}
                                                               onClick={x => onItemSelected(x)}/>) : null;
        return (
            <ul className="item-list list-group">
                {body}
            </ul>
        );
    }
}

const ItemView = ({item, onClick, renderItem}) => {
    return (<li className="list-group-item" onClick={x => onClick(item)}>{renderItem(item)}</li>)
}

const withData = (View) => {
    return class extends React.Component {

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
            data: null
        }

        componentDidMount() {
            const {onData} = this.props;
            onData()
                .then(data => {
                    this.setState({data});
                }).catch(e => this.onError(e));
        }

        onError(e) {
            this.props.onError(e);
        }

        render() {
            const {data} = this.state;
            const wait = data ? null : (<li key="spinner_li_qcdkpwe21" className="list-group-item"><Spinner/></li>)
            if (wait) {
                return wait;
            }
            return <View {...this.props} data={data}/>;
        }
    };
}

export default withData(ItemList);