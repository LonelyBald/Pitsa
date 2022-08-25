import React, {
  ChangeEvent,
  useContext,
  useRef,
  useState,
} from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { InputCrossSVG, SearchSVG } from '../../assets/svgs';
import { HeaderContext } from '../../Context';

export const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const { setSearchValue } = useContext(HeaderContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClickClear = () => {
    if (setSearchValue) {
      setSearchValue('');
    }
    setInputValue('');
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  };

  const updateSearchValue = debounce((value) => {
    if (setSearchValue) {
      setSearchValue(value);
    }
  }, 1000);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
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
