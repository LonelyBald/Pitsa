import React from 'react';
import { CartEmpty, CartItem } from '../components';
import { clearCart } from '../redux/slices/cartSlice';
import { BinSVG, CartSVG, LeftArrowSVG } from '../assets/svgs';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';

const CLEAN_CART_MESSAGE = 'Вы хотити очистить корзину?';

export function Cart() {
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useAppSelector(
    (state) => state.cartSlice
  );
  const onClickClear = () => {
    if (window.confirm(CLEAN_CART_MESSAGE)) {
      dispatch(clearCart());
    }
  };
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  if (!totalPrice) {
    return <CartEmpty />;
  }
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart">
          <div className="cart__top">
            <div className="content__title">
              <CartSVG />
              <h2>Корзина</h2>
            </div>
            <div onClick={onClickClear} className="cart__clear">
              <BinSVG />
              <span>Очистить корзину</span>
            </div>
          </div>
          <div className="content__items">
            {items.map((item) => (
              <CartItem
                type={item.type}
                size={item.size}
                key={item.id + item.type + item.size}
                id={item.id}
                category={item.category}
                rating={item.rating}
                title={item.title}
                price={item.price}
                count={item.count}
                imageUrl={item.imageUrl}
              />
            ))}
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span>
                  Всего пицц: <b>{totalCount} шт.</b>
                </span>
                <span>
                  Сумма заказа: <b>{totalPrice} ₸</b>
                </span>
              </div>
              <div className="cart__bottom-buttons">
                <Link
                  to="/"
                  className="button button--outline button--add go-back-btn"
                >
                  <LeftArrowSVG />
                  <span>Вернуться назад</span>
                </Link>
                <div className="button pay-btn">
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
