import React from 'react';
import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header';
import {Route, Switch} from "react-router-dom";

import Background from './food-bg.jpg';
import MenuItem from "../menu-item";

const App = () => {
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader total={50}/>
            <Switch>
                <Route path='/cart'>
                    <CartPage/>
                </Route>
                <Route path="/item/:id" render={ ({match}) => <MenuItem itemId={match.params.id}/>}/>
                <Route path='/'>
                    <MainPage/>
                </Route>
            </Switch>
        </div>
    )
}

export default App;