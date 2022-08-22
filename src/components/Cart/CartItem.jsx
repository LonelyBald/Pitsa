import React from 'react';
import { useDispatch } from 'react-redux';
import {
  addItem,
  clearItems,
  minusItem,
} from '../../redux/slices/cartSlice';
import { CrossSVG, MinusSVG, PlusSVG } from '../../assets/svgs';

export const CartItem = ({
  id,
  title,
  type,
  size,
  price,
  count,
  imageUrl,
}) => {
  const pitsaCharacteristics = { id, size, type };
  const dispatch = useDispatch();
  const onClickPlus = () => {
    dispatch(addItem(pitsaCharacteristics));
  };

  const onClickMinus = () => {
    dispatch(minusItem(pitsaCharacteristics));
  };

  const onClickClear = () => {
    if (window.confirm('Вы хотити удалить весь товар?')) {
      dispatch(clearItems(id));
    }
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
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <MinusSVG />
        </div>
        <b>{count}</b>
        <div
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <PlusSVG />
        </div>
        <div className="cart__item-price">
          <b>{price * count} ₸</b>
        </div>
        <div className="cart__item-remove">
          <div
            onClick={onClickClear}
            className="button button--outline button--circle"
          >
            <CrossSVG />
          </div>
        </div>
      </div>
    </div>
  );
};
