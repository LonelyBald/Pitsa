import React, { useContext} from 'react'
import { HeaderContext } from '../../Context'
import styles from './Search.module.scss'

export const Search = () => {
  const {searchValue, setSearchValue} = useContext(HeaderContext)

  return (
    <div className={styles.root}>
        <input
          value={searchValue} 
          onChange={event => setSearchValue(event.target.value)} 
          className={styles.input} placeholder='Поиск пиццы...'
        />
        <svg className={styles.icon}
             xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 50 50" height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="50px" >
        <rect fill="none" height="50" width="50"/>
        <circle cx="21" cy="20" fill="none" r="16" stroke="#000000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
        <line fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="4" x1="32.229" x2="45.5" y1="32.229" y2="45.5"/>
        </svg>
        {searchValue && (
        <svg 
          onClick={() => setSearchValue('')}
          className={styles.close} 
          xmlns="http://www.w3.org/2000/svg" 
          version="1.1" 
          viewBox="0 0 36 36">
        <path d="M6.2,3.5L3.5,6.2c-0.7,0.7-0.7,1.9,0,2.7l9.2,9.2l-9.2,9.2c-0.7,0.7-0.7,1.9,0,2.7l2.6,2.6   c0.7,0.7,1.9,0.7,2.7,0l9.2-9.2l9.2,9.2c0.7,0.7,1.9,0.7,2.7,0l2.6-2.6c0.7-0.7,0.7-1.9,0-2.7L23.3,18l9.2-9.2   c0.7-0.7,0.7-1.9,0-2.7l-2.6-2.6c-0.7-0.7-1.9-0.7-2.7,0L18,12.7L8.8,3.5C8.1,2.8,6.9,2.8,6.2,3.5z" id="close_1_"/>
        </svg>)}
    </div>
  )
}
