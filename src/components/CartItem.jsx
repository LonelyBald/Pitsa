import React from 'react';
import { useDispatch } from 'react-redux';
import {
  addItem,
  minusItem,
  clearItems,
} from '../redux/slices/cartSlice';
import { PlusSVG } from '../assets/svgs/PlusSVG';
import { MinusSVG } from '../assets/svgs/MinusSVG';
import { CrossSVG } from '../assets/svgs/CrossSVG';

const CartItem = ({
  id,
  title,
  type,
  size,
  price,
  count,
  imageUrl,
}) => {
  const dispatch = useDispatch();
  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
        size,
        type,
      })
    );
  };

  const onClickMinus = () => {
    dispatch(minusItem({ id, size, type }));
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

export default CartItem;
