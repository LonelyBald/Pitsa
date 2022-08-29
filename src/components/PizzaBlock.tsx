import React, { useMemo, useState } from 'react';
import { addItem } from '../redux/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { PizzaType } from '../types/pizzaType';
import { PlusSVG } from '../assets/svgs';

const typeNames = ['Thin', 'Traditional'];

export function PizzaBlock({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}: PizzaType) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) =>
    state.cartSlice.items.filter((obj) => obj.id === id)
  );
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const addedCount = useMemo(() => {
    let totalCount = 0;
    cartItems.forEach((pizza) => {
      totalCount += pizza.count;
    });
    return totalCount;
  }, [cartItems]);

  const onClickAdd = () => {
    dispatch(
      addItem({
        id,
        title,
        price,
        imageUrl,
        type: typeNames[activeType],
        size: sizes[activeSize],
      })
    );
  };

  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={imageUrl}
        alt="Pizza"
      />
      <h4 className="pizza-bl,ock__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              onClick={() => setActiveType(typeId)}
              className={activeType === typeId ? 'active' : ''}
              key={typeNames[typeId]}
            >
              {typeNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? 'active' : ''}
              key={size}
            >
              {size} cm.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from {price} $</div>
        <button
          className="button button--outline button--add"
          onClick={onClickAdd}
        >
          <PlusSVG />
          <span>Add</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
}
