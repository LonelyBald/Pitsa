import React from 'react';
import CartItem from '../components/CartItem';
import { clearItems } from '../redux/slices/cartSlice';
import CartEmpty from '../components/CartEmpty';
import { CartSVG } from '../assets/svgs/CartSVG';
import { BinSVG } from '../assets/svgs/BinSVG';
import { LeftArrowSVG } from '../assets/svgs/LeftArrowSVG';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';

function Cart() {
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useAppSelector(
    (state) => state.cartSlice
  );

  const onClickRemove = () => {
    if (window.confirm('Вы хотити очистить корзину?')) {
      dispatch(clearItems());
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
          {/*TODO: refactor content title style*/}
          <div className="cart__top">
            <div className="content__title">
              <CartSVG />
              <h2 className="content__title">Корзина</h2>
            </div>
            <div onClick={onClickRemove} className="cart__clear">
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

export default Cart;
