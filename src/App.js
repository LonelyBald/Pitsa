import React, { useState, useEffect } from 'react';
import './scss/app.scss';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch('https://629de05cc6ef9335c0a8e475.mockapi.io/api/pitsa/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все питсы</h2>
          <div className="content__items">
            {items.map((obj) => (
              <PizzaBlock {...obj} key={obj.title + obj.price} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
