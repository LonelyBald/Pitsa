import React from 'react';
import { Outlet } from 'react-router-dom';
import './scss/app.scss';

import Header from './components/Header';
import { HeaderContextProvider } from './Context';

function App() {
  return (
    <div className="wrapper">
      <HeaderContextProvider>
        <Header />
        <Outlet />
      </HeaderContextProvider>
    </div>
  );
}

export default App;
