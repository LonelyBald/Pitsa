import { MutableRefObject, useContext, useEffect } from 'react';
import qs from 'qs';
import { SORTLIST } from '../constants';
import { setFilters } from '../redux/slices/filterSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useNavigate } from 'react-router';
import { HeaderContext } from '../Context';

interface UseURLParamsPropType {
  isSearch: MutableRefObject<boolean>;
}

export const useURLParams = ({ isSearch }: UseURLParamsPropType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sort, categoryId } = useAppSelector(
    (state) => state.filterSlice
  );
  const { searchValue } = useContext(HeaderContext);

  const sortType = sort.sortProperty;
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortBy = sortType.replace('-', '');
  const order = sortType.includes('-');
  const search = searchValue ? `&search=${searchValue}` : '';

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
  }, [dispatch, navigate, isSearch]);

  return {
    sortType,
    category,
    sortBy,
    order,
    search,
  };
};
