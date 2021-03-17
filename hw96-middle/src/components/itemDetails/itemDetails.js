import React, {Component} from 'react';
import './itemDetails.css';

const RowDetail = ({label, item, renderItem}) => {
    return (<li className="list-group-item d-flex justify-content-between">
        <span className="term">{label}</span>
        <span>{renderItem(item)}</span>
    </li>)
}

export default class ItemDetails extends Component {
    render() {
        const {renderHeader} = this.props;
        return (
            <div className="char-details rounded">
                <h4>{renderHeader()}</h4>
                <ul className="list-group list-group-flush">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

export {RowDetail};