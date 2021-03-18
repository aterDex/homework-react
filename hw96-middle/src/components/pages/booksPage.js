import React from "react";
import {Col, Row} from "reactstrap";
import ItemList from "../itemList";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";
import {withRouter} from 'react-router-dom';

class BooksPage extends React.Component {

    _gs = new GotService();

    state = {
        error: false
    }

    onBookSelected(book) {
        this.props.history.push(book.id);
    }

    componentDidCatch(error, errorInfo) {
        this.onError();
    }

    loadData(prop) {
        return this._gs.getBooks(prop);
    }

    onError(e) {
        this.setState({error: true});
    }

    render() {
        const {error} = this.state;
        if (error) {
            return <ErrorMessage/>;
        }
        return (<Row>
            <Col md='12'>
                <ItemList onError={x => this.onError(x)}
                          onData={() => this.loadData()}
                          onItemSelected={x => this.onBookSelected(x)}
                          renderItem={({name}) => name}
                />
            </Col>
        </Row>)
    }
}


export default withRouter(BooksPage);