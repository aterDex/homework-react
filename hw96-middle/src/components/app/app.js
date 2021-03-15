import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';


export default class App extends React.Component {
    state = {showRandomCharacter: true}

    toggleRandomCharacter = () => {
        this.setState(({showRandomCharacter}) => ({showRandomCharacter: !showRandomCharacter}));
    }

    render() {
        const {showRandomCharacter} = this.state;
        return (

            <>
                <Container>
                    <Header toggleRandomCharacter={this.toggleRandomCharacter}/>
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {showRandomCharacter ? <RandomChar/> : null}
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList/>
                        </Col>
                        <Col md='6'>
                            <CharDetails/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}