import React from "react";
import GotService from "../../services/gotService";
import ItemDetails, {RowDetail} from "../itemDetails";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import BasePane from "../panes";

export default class BookItem extends React.Component {
    _gs = new GotService();

    state = {
        book: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.update(this.props.bookId);
    }

    update(bookId) {
        this._gs.getBook(bookId)
            .then(book => this.setState({loading: false, error: false, book}))
            .catch(e => this.onError(e));
    }

    onError(e) {
        this.setState({book: null, loading: false, error: true})
    }

    render() {
        const {book, loading, error} = this.state,
            load = loading ? <Spinner/> : null,
            er = error ? <ErrorMessage/> : null,
            content = !(loading || error) ? (<ItemDetails renderHeader={() => book.name}>
                <RowDetail label="Number Of Pages" item={book} renderItem={x => x.numberOfPages}/>
                <RowDetail label="Publisher" item={book} renderItem={x => x.publisher}/>
                <RowDetail label="Released" item={book} renderItem={x => x.released}/>
            </ItemDetails>) : null;
        return (
            <BasePane>
                {load}
                {er}
                {content}
            </BasePane>
        )
    }
}