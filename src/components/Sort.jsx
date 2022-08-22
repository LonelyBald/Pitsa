import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice';
import { SortArrowSVG } from '../assets/svgs';
import { SORTLIST } from '../constants';

export function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filterSlice.sort);
  const sortRef = useRef();

  const [open, setOpen] = useState(false);
  const onClickListItem = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <SortArrowSVG />
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {!open && (
        <div className="sort__popup">
          <ul>
            {SORTLIST.map((obj, index) => (
              <li
                onClick={() => onClickListItem(obj)}
                className={
                  sort.sortProperty === obj.sortProperty
                    ? 'active'
                    : ''
                }
                key={obj + index}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
