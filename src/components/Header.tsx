// @ts-ignore
import PizzaLogo from '../assets/img/pizza-logo.svg';
import { Link } from 'react-router-dom';
import { Search } from './Search';
// @ts-ignore
import CartSVG from '../assets/img/cart.svg';
import { useAppSelector } from '../redux/store';

//TODO: fix svg types
function Header() {
  const { totalPrice, items } = useAppSelector(
    (state) => state.cartSlice
  );

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={PizzaLogo} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная питса во вселенной</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          <nav>
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} ₸</span>
              <div className="button__delimiter" />
              <img className="button--img" src={CartSVG} alt="cart" />
              <span>{totalCount}</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
