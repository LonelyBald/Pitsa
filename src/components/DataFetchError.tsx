import React from 'react';
import pictureTom from '../assets/img/TomLying.png';

export const DataFetchError = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Ошибка получения данных</h2>
        <p>
          Сайт временно не работает
          <br />
          Ведутся работы на сервере
        </p>
        <img src={pictureTom} alt="Data Fetch Error" />
      </div>
    </>
  );
};
