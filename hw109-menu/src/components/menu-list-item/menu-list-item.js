import React from 'react';
import './menu-list-item.scss';
import {Link} from "react-router-dom";

const MenuListItem = ({menuItem: {id, title, price, url, category, ico}, withoutLink}) => {
    console.log(withoutLink);
    const Ll = withoutLink ? Transit : Link;
    return (

        <li className="menu__item">
            <div className="menu__title">{title}</div>
            <Ll to={`/item/${id}`} >
                <img className="menu__img"
                     src={url}
                     alt={title}></img>
            </Ll>
            <div className="menu__category">
                <img className="menu__ico" src={ico} alt={category}/>Category: <span>{category}</span></div>
            <div className="menu__price">Price: <span>{price}$</span></div>
            <button className="menu__btn">Add to cart</button>
        </li>
    )
}

const Transit = ({children}) => {
    return children;
}

export default MenuListItem;