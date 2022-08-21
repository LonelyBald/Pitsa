import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Menu from './pages/Menu';
import EmptyCart from './pages/NotFound';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const documentRoot = document.getElementById('root');
if (documentRoot) {
  const root = ReactDOM.createRoot(documentRoot);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart-empty" element={<EmptyCart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
