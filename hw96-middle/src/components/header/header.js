import React from 'react';
import {ButtonToggle} from "reactstrap";
import {Link} from "react-router-dom";

import './header.css';


const Header = ({toggleRandomCharacter}) => {
    return (
        <div className="headerBlock">
            <h3 className="headerTitle">
                <Link to='/'>
                    Game of Thrones DB
                </Link>
            </h3>
            <ButtonToggle onClick={() => toggleRandomCharacter()}>
                Toggle random character
            </ButtonToggle>
            <ul className="headerLinks">
                <li>
                    <Link to='/characters/'>Characters</Link>
                </li>
                <li>
                    <Link to='/houses/'>Houses</Link>
                </li>
                <li>
                    <Link to='/books'>Books</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;