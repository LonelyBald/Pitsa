import React, { useEffect, useRef, useState } from 'react';
import { setSort } from '../redux/slices/filterSlice';
import { SortArrowSVG } from '../assets/svgs';
import { SORTLIST } from '../constants';
import { useAppDispatch, useAppSelector } from '../redux/store';

type HandleChangeCategoryType = (sortParams: {
  [key: string]: string;
}) => void;
interface MouseEventWithPathType extends MouseEvent {
  path: Array<HTMLDivElement | null>;
}
export function Sort() {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.filterSlice.sort);
  const sortRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const handleChangeCategory: HandleChangeCategoryType = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEventWithPathType) => {
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
      {open && (
        <div className="sort__popup">
          <ul>
            {SORTLIST.map((obj) => (
              <li
                onClick={() => handleChangeCategory(obj)}
                className={
                  sort.sortProperty === obj.sortProperty
                    ? 'active'
                    : ''
                }
                key={obj.name + obj.sortProperty}
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
