import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from "../pages/characterPage";
import BooksPage from "../pages/booksPage";
import HousesPage from "../pages/housesPage";


export default class App extends React.Component {
    state = {
        showRandomCharacter: true
    }

    toggleRandomCharacter = () => {
        this.setState(({showRandomCharacter}) => ({showRandomCharacter: !showRandomCharacter}));
    }

    render() {
        const {showRandomCharacter, selectChar: char} = this.state;
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
                    <CharacterPage/>
                    <BooksPage/>
                    <HousesPage/>
                </Container>
            </>
        );
    }
}