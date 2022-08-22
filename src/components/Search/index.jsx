import React, { useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { HeaderContext } from '../../Context';
import styles from './Search.module.scss';
import { InputCrossSVG, SearchSVG } from '../../assets/svgs';

export const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const { setSearchValue } = useContext(HeaderContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue('');
    setInputValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = debounce((value) => {
    setSearchValue(value);
  }, 1000);

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      <SearchSVG className={styles.icon} />
      {inputValue && (
        <InputCrossSVG
          className={styles.close}
          onClick={onClickClear}
        />
      )}
    </div>
  );
};
