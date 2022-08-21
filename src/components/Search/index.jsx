import React, { useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { HeaderContext } from '../../Context';
import styles from './Search.module.scss';
import { SearchSVG } from '../../assets/svgs/SearchSVG';
import { InputCrossSVG } from '../../assets/svgs/InputCrossSVG';

export const Search = () => {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(HeaderContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = debounce((value) => {
    setSearchValue(value);
  }, 1000);

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      <SearchSVG className={styles.icon} />
      {value && (
        <InputCrossSVG
          className={styles.close}
          onClick={onClickClear}
        />
      )}
    </div>
  );
};
