import React from 'react';

import './header.css';
import {Button, ButtonToggle} from "reactstrap";

const Header = ({toggleRandomCharacter: toggleRandomCharacter}) => {
    return (
        <div className="headerBlock">
            <h3 className="headerTitle">
                <a href="#">
                    Game of Thrones DB
                </a>
            </h3>
            <ButtonToggle onClick={() => toggleRandomCharacter()}>
                Toggle random character
            </ButtonToggle>
            <ul className="headerLinks">
                <li>
                    <a href="#">Characters</a>
                </li>
                <li>
                    <a href="#">Houses</a>
                </li>
                <li>
                    <a href="#">Books</a>
                </li>
            </ul>
        </div>
    );
};

export default Header;