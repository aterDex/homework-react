import React, {Component} from 'react';
import './randomChar.css';
import GotService from "../../services/gotService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

export default class RandomChar extends Component {

    gs = new GotService();
    state = {
        char: {},
        loading: true,
        error: false,
        errorText: ""
    }

    constructor(props) {
        super(props);

        this.updateCharacter = this.updateCharacter.bind(this);
    }

    componentDidMount() {
        this.updateCharacter();
        this._tm = setInterval(this.updateCharacter, 5000);
    }

    componentWillUnmount() {
        clearInterval(this._tm);
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false});
    }

    onError = (error) => {
        this.setState({
            loading: false,
            error: true,
            errorText: `${error}`
        })
    }

    updateCharacter() {
        this.gs.getCharacter(Math.floor(Math.random() * 100))
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    render() {
        const {char, loading, error, errorText} = this.state;
        const load = loading ? <Spinner/> : null,
            err = error ? <ErrorMessage text={errorText}/> : null,
            content = loading || error ? null : <View char={char}/>;
        return (
            <div className="random-block rounded">
                {load}
                {err}
                {content}
            </div>
        );
    }

}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return <>
        <h4>Random Character: {name}</h4>
        <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Gender </span>
                <span>{gender}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Born </span>
                <span>{born}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Died </span>
                <span>{died}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Culture </span>
                <span>{culture}</span>
            </li>
        </ul>
    </>
}
