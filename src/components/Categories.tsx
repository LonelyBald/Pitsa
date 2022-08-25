import React from 'react';
import { CATEGORIES } from '../constants';

interface CategoriesPropType {
  value: number;
  onClickCategory: (id: number) => void;
}

export function Categories({
  value,
  onClickCategory,
}: CategoriesPropType) {
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
