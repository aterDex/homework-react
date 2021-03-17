import React from "react";
import {Col, Container, Row} from "reactstrap";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";

export default class CharacterPage extends React.Component {

    _gs = new GotService();

    state = {
        char: null,
        error: false
    }

    onCharSelected = (char) => {
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
        return (<Row>
            <Col md='6'>
                <ItemList onError={x => this.onError(x)}
                          onData={x => this.loadData(x)}
                          onItemSelected={this.onCharSelected}
                          renderItem={({name, gender}) => `${name} (${gender})`}
                />
            </Col>
            <Col md='6'>
                <CharDetails char={char}/>
            </Col>
        </Row>)
    }
}