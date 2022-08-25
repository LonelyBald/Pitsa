import React from 'react';
import { Link } from 'react-router-dom';
import picture from '../../assets/img/empty-cart.png';

export const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Корзина пустая</h2>
        <p>Вероятней всего, вы не заказывали ещё пиццу.</p>
        <p>
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={picture} alt="Empty cart" />
        <Link to="/" className="button button--black">
          Вернуться назад
        </Link>
      </div>
    </>
  );
};
