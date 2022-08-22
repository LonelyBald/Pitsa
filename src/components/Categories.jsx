import React from 'react';
import { CATEGORIES } from '../constants';

export function Categories({ value, onClickCategory }) {
  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((categoryName, index) => (
          <li
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}
            key={categoryName + index}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
