import React, { useState, useEffect, useContext } from 'react';
import '../scss/app.scss';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/ContentLoader'
import PizzaBlock from '../components/PizzaBlock';
import { HeaderContext } from '../Context';
import { Pagination } from '../components/Pagination';

function Menu() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState({name:'популярности', sort:'rating'})
  const {searchValue, setSearchValue} = useContext(HeaderContext)
  
  useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sortType.sort.replace('-', '')
    const order = sortType.sort.includes('-')
    const search = searchValue ? `&search=${searchValue}` : ''

    setIsLoading(true)
    fetch(`https://629de05cc6ef9335c0a8e475.mockapi.io/api/pitsa/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}
      `)
    .then((res) => res.json())
    .then((json) => {
        setItems(json);
        setIsLoading(false)
    });
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => (<PizzaBlock {...obj} key={obj.title + obj.types}/>))
  

  const skeletons = [...new Array(4)]

  return (
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories value={categoryId} onClickСategory={(index) => setCategoryId(index)}/>
            <Sort value={sortType} onClickSort={(index) => setSortType(index)}/>
          </div>
          <h2 className="content__title">Все питсы</h2>
          <div className="content__items">
            {isLoading ? skeletons.map((_, index) => <Skeleton key={index}/>) : pizzas}
          </div>
          <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
      </div>
  );
}


export default Menu;
