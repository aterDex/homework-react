import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {HousesPage, CharacterPage, BooksPage, BookItem} from "../pages";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import NotFound from "../notFound";


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
                        <Switch>
                            <Route path="/characters" exact>
                                <CharacterPage/>
                            </Route>
                            <Route path="/houses" exact>
                                <HousesPage/>
                            </Route>

                            <Route path="/books/:id" exact render={({match}) => {
                                const {id} = match.params;
                                return <BookItem bookId={id}/>;
                            }}/>
                            <Redirect from="/books" strict exact to="/books/"/>
                            <Route path="/books/" exact>
                                <BooksPage/>
                            </Route>
                            <Route path="/" exact strict/>
                            <Route>
                                <NotFound/>
                            </Route>
                        </Switch>
                    </Container>
                </div>
            </Router>
        );
    }
}