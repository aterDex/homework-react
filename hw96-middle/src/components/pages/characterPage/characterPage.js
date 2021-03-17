import React from "react";
import {Col, Row} from "reactstrap";
import ItemList from "../../itemList";
import ItemDetails, {RowDetail} from "../../itemDetails";
import ErrorMessage from "../../errorMessage/errorMessage";
import GotService from "../../../services/gotService";

export default class CharacterPage extends React.Component {

    _gs = new GotService();

    state = {
        char: null,
        error: false
    }

    onCharSelected(char) {
        this.setState({char});
    }

    componentDidCatch(error, errorInfo) {
        this.onError();
    }

    loadData(x) {
        return this._gs.getCharacters(x);
    }

    onError(e) {
        this.setState({error: true});
    }

    render() {
        const {char, error} = this.state;
        if (error) {
            return <ErrorMessage/>;
        }
        const char2 = char || {};
        return (<Row>
            <Col md='6'>
                <ItemList onError={x => this.onError(x)}
                          onData={() => this.loadData({page: 6})}
                          onItemSelected={x => this.onCharSelected(x)}
                          renderItem={({name, gender}) => `${name} (${gender})`}
                />
            </Col>
            <Col md='6'>
                <ItemDetails renderHeader={() => char2.name}>
                    <RowDetail label="Gender" item={char2} renderItem={x => x.gender}/>
                    <RowDetail label="Born" item={char2} renderItem={x => x.born}/>
                    <RowDetail label="Died" item={char2} renderItem={x => x.died}/>
                    <RowDetail label="Culture" item={char2} renderItem={x => x.culture}/>
                </ItemDetails>
            </Col>
        </Row>)
    }
}