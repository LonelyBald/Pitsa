import React, {
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import '../scss/app.scss';
import qs from 'qs';
import { useNavigate } from 'react-router';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Skeleton from '../components/ContentLoader';
import PizzaBlock from '../components/PizzaBlock';
import { HeaderContext } from '../Context';
import { Pagination } from '../components/Pagination';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { getPitsaListThunk } from '../redux/thunk/getPitsaListThunk';
import { DataFetchError } from '../components/DataFetchError';
import { useAppDispatch, useAppSelector } from '../redux/store';

function Menu() {
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { categoryId, sort, currentPage } = useAppSelector(
    (state) => state.filterSlice
  );
  const { items, isLoading, isError } = useAppSelector(
    (state) => state.menuSlice
  );

  // @ts-ignore
  //TODO: fix context types
  const { searchValue } = useContext(HeaderContext);

  const sortType = sort.sortProperty;
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortBy = sortType.replace('-', '');
  const order = sortType.includes('-');
  const search = searchValue ? `&search=${searchValue}` : '';

  const pizzas = items.map((obj) => (
    <PizzaBlock {...obj} key={obj.title + obj.types} />
  ));
  const skeletons = [...new Array(4)];

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const fetchPizzas = useCallback(() => {
    return dispatch(
      getPitsaListThunk({
        currentPage,
        category,
        sortBy,
        order,
        search,
      })
    );
  }, [category, dispatch, order, search, sortBy, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortType
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, [dispatch, fetchPizzas, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage, fetchPizzas]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortType,
        searchValue,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage, navigate]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onClickСategory={onChangeCategory}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все питсы</h2>
        <div className="content__items">
          {isLoading
            ? skeletons.map((_, index) => <Skeleton key={index} />)
            : pizzas}
        </div>
        <div className="content__items">
          {isError ? <DataFetchError /> : ''}
        </div>
        <Pagination
          onChangePage={(id: number) => dispatch(setCurrentPage(id))}
          totalPageCount={pizzas.length / 5}
        />
      </div>
    </div>
  );
}

export default Menu;
