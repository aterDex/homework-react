import React from 'react';
import './cart-table.scss';
import {connect} from "react-redux";

import {selectItemDel, selectItemAdd} from "../../actions";

const CartTable = ({items = [], onDelete, onAdd}) => {
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {id, title, price, url, count} = item;
                        return (
                            <div key={id} className="cart__item">
                                <img
                                    src={url}
                                    className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$</div>
                                <div className="cart__item-count">
                                    <button onClick={() => onAdd(item)} className="cart__item-btn">+</button>
                                    {count}
                                    <button onClick={() => onDelete(item.id, 1)} className="cart__item-btn">-</button>
                                </div>
                                <div onClick={() => onDelete(item.id)} className="cart__close">&times;</div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};

const mapStateToProps = (store) => {
    return {
        items: store.selectItem
    };
}

const mapDispatchToProps = {
    onDelete: selectItemDel,
    onAdd: selectItemAdd
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);