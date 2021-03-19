import React, {Component} from 'react';
import './randomChar.css';
import GotService from "../../services/gotService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import ItemDetails, {RowDetail} from "../itemDetails";
import BasePane from "../panes";
import PropTypes from "prop-types";

export default class RandomChar extends Component {

    static defaultProps = {
        updateInterval: 240000
    }

    static propTypes = {
        updateInterval: PropTypes.number
    }

    gs = new GotService();
    state = {
        char: {},
        loading: true,
        error: false,
        errorText: ""
    }

    componentDidMount() {
        this.updateCharacter();
        console.log("set interval", this.props.updateInterval)
        this._tm = setInterval(() => this.updateCharacter(), this.props.updateInterval);
    }

    componentWillUnmount() {
        clearInterval(this._tm);
    }

    onCharLoaded(char) {
        this.setState({char, loading: false, error: false});
    }

    onError = (error) => {
        this.setState({
            loading: false,
            error: true,
            errorText: `${error}`
        })
    }

    updateCharacter() {
        this.setState({loading: true, error: false});
        this.gs.getCharacter(Math.floor(Math.random() * 100 + 1))
            .then(char => this.onCharLoaded(char))
            .catch(this.onError);
    };

    render() {
        const {char, loading, error, errorText} = this.state;
        const load = loading ? <Spinner/> : null,
            err = error ? <ErrorMessage text={errorText}/> : null,
            content = loading || error ? null : <View char={char}/>;
        return (
            <BasePane>
                {load}
                {err}
                {content}
            </BasePane>
        );
    }
}

const View = ({char}) => {
    return <ItemDetails renderHeader={() => `Random Character: ${char.name}`}>
        <RowDetail label="Gender" item={char} renderItem={x => x.gender}/>
        <RowDetail label="Born" item={char} renderItem={x => x.born}/>
        <RowDetail label="Died" item={char} renderItem={x => x.died}/>
        <RowDetail label="Culture" item={char} renderItem={x => x.culture}/>
    </ItemDetails>
}