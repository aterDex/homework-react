import React from "react";
import {Col, Container, Row} from "reactstrap";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import ErrorMessage from "../errorMessage/errorMessage";

export default class CharacterPage extends React.Component {

    state = {
        char: null,
        error: false
    }

    onCharSelected = (char) => {
        this.setState({char});
    }

    componentDidCatch(error, errorInfo) {
        this.setState({error: true});
    }

    render() {
        const {char, error} = this.state;
        if (error) {
            return <ErrorMessage/>;
        }

        return (<Row>
            <Col md='6'>
                <ItemList onCharSelected={this.onCharSelected}/>
            </Col>
            <Col md='6'>
                <CharDetails char={char}/>
            </Col>
        </Row>)
    }
}