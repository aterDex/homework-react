import React from 'react';
import './itemList.css';
import GotService from "../../services/gotService";
import Spinner from "../spinner";

export default class ItemList extends React.Component {

    _gs = new GotService();

    state = {
        charList: null
    }

    componentDidMount() {
        this._gs.getCharacters({page: 6})
            .then((charList) => this.setState({charList}));
    }

    render() {
        const {onCharSelected} = this.props;
        const {charList} = this.state;

        const wait = charList ? null : (<li key="dddddddddd" className="list-group-item"><Spinner/></li>)
        const body = charList ? charList.map(char => <CharView key={char.id} char={char} onClick={x => onCharSelected(x)}/>) : null;
        return (
            <ul className="item-list list-group">
                {wait}
                {body}
            </ul>
        );
    }
}

const CharView = ({char, onClick}) => {
    return (<li className="list-group-item" onClick={x => onClick(char)}>{char.name}</li>)
}