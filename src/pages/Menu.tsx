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
} from '../redux/slices/filterSlice';
import { getPitsaListThunk } from '../redux/thunk/getPitsaListThunk';
import { useAppDispatch, useAppSelector } from '../redux/store';
import qs from 'qs';
import { useURLParams } from '../utils/useURLParams';

export function Menu() {
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sortType, category, sortBy, order, search } = useURLParams({
    isSearch,
  });

  const { categoryId, currentPage } = useAppSelector(
    (state) => state.filterSlice
  );
  const { items, isLoading, isError } = useAppSelector(
    (state) => state.menuSlice
  );

  const { searchValue } = useContext(HeaderContext);

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
        />
      </div>
    </div>
  );
}
