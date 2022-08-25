import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cart, Menu, NotFound } from './pages';
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
            <Route path="/cart-empty" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
