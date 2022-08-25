import React from 'react';
import {
  addItem,
  minusItem,
  removeItem,
} from '../../redux/slices/cartSlice';
import { CrossSVG, MinusSVG, PlusSVG } from '../../assets/svgs';
import { useAppDispatch } from '../../redux/store';
import { CartItemType } from '../../types/cartItemType';

export const CartItem = ({
  id,
  title,
  type,
  size,
  price,
  count,
  imageUrl,
}: CartItemType) => {
  const pitsaCharacteristics = { id, size, type };
  const dispatch = useAppDispatch();
  const handleAddItem = () => {
    dispatch(addItem(pitsaCharacteristics));
  };

  const handleRemoveItem = () => {
    dispatch(minusItem(pitsaCharacteristics));
  };

  const handleClearCart = () => {
    dispatch(removeItem(pitsaCharacteristics));
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
          {type}, {size} см.
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
          <b>{price * count} ₸</b>
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
