import PizzaLogo from '../assets/img/pizza-logo.svg'
import { Link } from 'react-router-dom'
import { Search } from './Search'
import CartSVG from '../assets/img/cart.svg'

function Header () {
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
          <Search/>
          <div className="header__cart">
            <nav>
            <Link to="/cart" className="button button--cart">
              <span>1520 ₸</span>
              <div className="button__delimiter" />
                <img className="button--img" src={CartSVG} alt='cart'/>
              <span>3</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    )
}

export default Header