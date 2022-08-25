import React from 'react';
import { Outlet } from 'react-router-dom';
import './scss/app.scss';

import { Header } from './components';
import { HeaderContextProvider } from './Context';

export function App() {
  return (
    <div className="wrapper">
      <HeaderContextProvider>
        <Header />
        <Outlet />
      </HeaderContextProvider>
    </div>
  );
}
