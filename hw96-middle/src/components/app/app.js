import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from "../pages/characterPage";
import BooksPage from "../pages/booksPage";
import HousesPage from "../pages/housesPage";
import {BrowserRouter as Router, Route} from "react-router-dom";


export default class App extends React.Component {
    state = {
        showRandomCharacter: true
    }

    toggleRandomCharacter = () => {
        this.setState(({showRandomCharacter}) => ({showRandomCharacter: !showRandomCharacter}));
    }

    render() {
        const {showRandomCharacter} = this.state;
        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header toggleRandomCharacter={this.toggleRandomCharacter}/>
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {showRandomCharacter ? <RandomChar/> : null}
                            </Col>
                        </Row>
                        <Route path="/characters" component={CharacterPage}/>
                        <Route path="/books" component={BooksPage}/>
                        <Route path="/houses" component={HousesPage}/>
                    </Container>
                </div>
            </Router>
        );
    }
}