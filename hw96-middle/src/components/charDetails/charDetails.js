import React, {Component} from 'react';
import './charDetails.css';

export default class CharDetails extends Component {

    constructor(props) {
        super(props);
        console.log("I create");
    }

    render() {
        let {char} = this.props;
        if (!char) char = {};
        return (
            <div className="char-details rounded">
                <h4>{char.name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{char.gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{char.born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{char.died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{char.culture}</span>
                    </li>
                </ul>
            </div>
        );
    }
}