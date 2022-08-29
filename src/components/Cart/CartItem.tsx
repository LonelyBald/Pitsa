import React from 'react';
import {
  addItem,
  minusItem,
  removeItem,
} from '../../redux/slices/cartSlice';
import { CrossSVG, MinusSVG, PlusSVG } from '../../assets/svgs';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import { CartItemType } from '../../types/cartItemType';
import {useSessionStorage} from "../../utils/useSessionStorage";

export const CartItem = ({
  id,
  title,
  type,
  size,
  price,
  count,
  imageUrl,
}: CartItemType) => {
  const pizzaCharacteristics = { id, size, type };
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(
      (state) => state.cartSlice
  );
  const {clearPizzaSessionStorage} = useSessionStorage(items)
  const handleAddItem = () => {
    dispatch(addItem(pizzaCharacteristics));
  };

  const handleRemoveItem = () => {
    dispatch(minusItem(pizzaCharacteristics));
    clearPizzaSessionStorage()
  };

  const handleClearCart = () => {
    dispatch(removeItem(pizzaCharacteristics));
    clearPizzaSessionStorage()
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img
          className="pizza-block__image"
          src={imageUrl}
          alt="Pizza"
        />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} cm.
        </p>
      </div>
      <div className="cart__item-count">
        <div
          onClick={handleRemoveItem}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <MinusSVG />
        </div>
        <b>{count}</b>
        <div
          onClick={handleAddItem}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <PlusSVG />
        </div>
        <div className="cart__item-price">
          <b>{price * count} $</b>
        </div>
        <div className="cart__item-remove">
          <div
            onClick={handleClearCart}
            className="button button--outline button--circle"
          >
            <CrossSVG />
          </div>
        </div>
      </div>
    </div>
  );
};
