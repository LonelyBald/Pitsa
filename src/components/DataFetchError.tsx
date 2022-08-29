import React from 'react';
import pictureTom from '../assets/img/TomLying.png';

export const DataFetchError = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Data fetch error</h2>
        <p>
          Site is temporarily down
          <br />
          Work in progress on the server
        </p>
        <img src={pictureTom} alt="Data Fetch Error" />
      </div>
    </>
  );
};
