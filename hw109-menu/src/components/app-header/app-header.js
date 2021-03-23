import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import './app-header.scss';
import {Link} from "react-router-dom";

const AppHeader = ({total, onBuy}) => {
    return (
        <header className="header">
            <Link className="header__link" to="">
                Menu
            </Link>
            <Link className="header__link" to="/cart">
                <img className="header__cart" src={cartIcon} alt="cart"></img>
                Total: {total} $
            </Link>
            {
                onBuy && total > 0 ? <button onClick={() => onBuy()} className="header__btn">Buy</button> : null
            }
        </header>
    )
};

export default AppHeader;