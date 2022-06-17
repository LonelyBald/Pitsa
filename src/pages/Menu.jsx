import React, { useState, useEffect } from 'react';
import '../scss/app.scss';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/ContentLoader'
import PizzaBlock from '../components/PizzaBlock';
import { fetchPizzasList } from '../api/pitsa-request';

function Menu() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPizzasList()
      .then((json) => {
        setItems(json);
        setIsLoading(false)
      });
  }, []);

  return (
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все питсы</h2>
          <div className="content__items">
            {isLoading ? [...new Array(4)].map((_, index) => <Skeleton key={index}/>) : items.map((obj) => (
              <PizzaBlock {...obj} key={obj.title + obj.price} />
            ))}
          </div>
        </div>
      </div>
  );
}


export default Menu;
