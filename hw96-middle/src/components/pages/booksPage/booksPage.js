import React from "react";
import {Col, Row} from "reactstrap";
import ItemList from "../../itemList";
import ItemDetails, {RowDetail} from "../../itemDetails";
import ErrorMessage from "../../errorMessage/errorMessage";
import GotService from "../../../services/gotService";

export default class BooksPage extends React.Component {

    _gs = new GotService();

    state = {
        book: null,
        error: false
    }

    onBookSelected(book) {
        this.setState({book});
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
        const {book, error} = this.state;
        if (error) {
            return <ErrorMessage/>;
        }
        const book2 = book || {};
        return (<Row>
            <Col md='6'>
                <ItemList onError={x => this.onError(x)}
                          onData={() => this.loadData()}
                          onItemSelected={x => this.onBookSelected(x)}
                          renderItem={({name}) => name}
                />
            </Col>
            <Col md='6'>
                <ItemDetails renderHeader={() => book2.name}>
                    <RowDetail label="Number Of Pages" item={book2} renderItem={x => x.numberOfPages}/>
                    <RowDetail label="Publisher" item={book2} renderItem={x => x.publisher}/>
                    <RowDetail label="Released" item={book2} renderItem={x => x.released}/>
                </ItemDetails>
            </Col>
        </Row>)
    }
}