import React, { useMemo, useState } from 'react';
import { addItem } from '../redux/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { PitsaType } from '../types/pitsaType';
import { PlusSVG } from '../assets/svgs/PlusSVG';

const typeNames = ['тонкое', 'традиционное'];

function PizzaBlock({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}: PitsaType) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) =>
    state.cartSlice.items.filter((obj) => obj.id === id)
  );
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const addedCount = useMemo(() => {
    let totalCount = 0;
    cartItems.forEach((pitsa) => {
      totalCount += pitsa.count;
    });
    return totalCount;
  }, [cartItems]);

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={imageUrl}
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{title}</h4>
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
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₸</div>
        <button
          className="button button--outline button--add"
          onClick={onClickAdd}
        >
          <PlusSVG />
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
}

export default PizzaBlock;
