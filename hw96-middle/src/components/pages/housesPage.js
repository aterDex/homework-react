import React from "react";
import {Col, Row} from "reactstrap";
import ItemList from "../itemList";
import ItemDetails, {RowDetail} from "../itemDetails";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";
import BasePane from "../panes";

export default class HousesPage extends React.Component {

    _gs = new GotService();

    state = {
        house: null,
        error: false
    }

    onHouseSelected(house) {
        this.setState({house});
    }

    componentDidCatch(error, errorInfo) {
        this.onError();
    }

    loadData(x) {
        return this._gs.getHouses(x);
    }

    onError(e) {
        this.setState({error: true});
    }

    render() {
        const {house, error} = this.state;
        if (error) {
            return <ErrorMessage/>;
        }
        const content = house ? <HousePane house={house}/> : <h4>Please select character first.</h4>;
        return (<Row>
            <Col md='6'>
                <ItemList onError={x => this.onError(x)}
                          onData={() => this.loadData({page: 6})}
                          onItemSelected={x => this.onHouseSelected(x)}
                          renderItem={({name, region}) => `${name} (${region})`}
                />
            </Col>
            <Col md='6'>
                <BasePane>
                    {content}
                </BasePane>
            </Col>
        </Row>)
    }
}

const HousePane = ({house}) => {
    return (<ItemDetails renderHeader={() => house.name}>
        <RowDetail label="Region" item={house} renderItem={x => x.region}/>
        <RowDetail label="Words" item={house} renderItem={x => x.words}/>
        <RowDetail label="Titles" item={house} renderItem={x => x.titles}/>
        <RowDetail label="Overlord" item={house} renderItem={x => x.overlord}/>
        <RowDetail label="Ancestral weapons" item={house} renderItem={x => x.ancestralWeapons}/>
    </ItemDetails>)
}
