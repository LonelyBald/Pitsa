import React from 'react';
import { CartEmpty, CartItem } from '../components';
import { clearCart } from '../redux/slices/cartSlice';
import { BinSVG, CartSVG, LeftArrowSVG } from '../assets/svgs';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {useSessionStorage} from "../utils/useSessionStorage";

const CLEAN_CART_MESSAGE = 'Do you want to clear cart?';

export function Cart() {
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useAppSelector(
    (state) => state.cartSlice
  );
  const {clearPizzaSessionStorage} = useSessionStorage(items)
  const onClickClear = () => {
    if (window.confirm(CLEAN_CART_MESSAGE)) {
      dispatch(clearCart())
      clearPizzaSessionStorage()
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
              <h2>Cart</h2>
            </div>
            <div onClick={onClickClear} className="cart__clear">
              <BinSVG />
              <span>Clear cart</span>
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
                  Total pizzas: <b>{totalCount} pcs.</b>
                </span>
                <span>
                  Order price: <b>{totalPrice} $</b>
                </span>
              </div>
              <div className="cart__bottom-buttons">
                <Link
                  to="/"
                  className="button button--outline button--add go-back-btn"
                >
                  <LeftArrowSVG />
                  <span>Back</span>
                </Link>
                <div className="button pay-btn">
                  <span>Pay now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
