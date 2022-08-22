import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import '../scss/app.scss';
import { useNavigate } from 'react-router';

import {
  Categories,
  DataFetchError,
  Pagination,
  PizzaBlock,
  Skeleton,
  Sort,
} from '../components';
import { HeaderContext } from '../Context';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { getPitsaListThunk } from '../redux/thunk/getPitsaListThunk';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { SORTLIST } from '../constants';
import qs from 'qs';

export function Menu() {
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

      const sort = SORTLIST.find(
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
            onClickCategory={onChangeCategory}
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
