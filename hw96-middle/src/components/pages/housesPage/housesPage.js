import React from "react";
import {Col, Row} from "reactstrap";
import ItemList from "../../itemList";
import ItemDetails, {RowDetail} from "../../itemDetails";
import ErrorMessage from "../../errorMessage/errorMessage";
import GotService from "../../../services/gotService";

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
        const house2 = house || {};
        return (<Row>
            <Col md='6'>
                <ItemList onError={x => this.onError(x)}
                          onData={() => this.loadData({page: 6})}
                          onItemSelected={x => this.onHouseSelected(x)}
                          renderItem={({name, region}) => `${name} (${region})`}
                />
            </Col>
            <Col md='6'>
                <ItemDetails renderHeader={() => house2.name}>
                    <RowDetail label="Region" item={house2} renderItem={x => x.region}/>
                    <RowDetail label="Words" item={house2} renderItem={x => x.words}/>
                    <RowDetail label="Titles" item={house2} renderItem={x => x.titles}/>
                    <RowDetail label="Overlord" item={house2} renderItem={x => x.overlord}/>
                    <RowDetail label="Ancestral weapons" item={house2} renderItem={x => x.ancestralWeapons}/>
                </ItemDetails>
            </Col>
        </Row>)
    }
}