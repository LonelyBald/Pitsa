import React from 'react';
import { Link } from 'react-router-dom';
import picture from '../../assets/img/empty-cart.png';

export const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Cart is empty</h2>
        <p>You probably haven't ordered pizza yet.</p>
        <p>
          To order pizza, go to the main page.
        </p>
        <img src={picture} alt="Empty cart" />
        <Link to="/" className="button button--black">
          Back
        </Link>
      </div>
    </>
  );
};
