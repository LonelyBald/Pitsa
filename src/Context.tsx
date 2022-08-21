import React, { createContext, useState } from 'react';
interface HeaderContextProviderTypes {
  children: React.ReactNode;
}
export const HeaderContext = createContext({});
export const HeaderContextProvider = ({
  children,
}: HeaderContextProviderTypes) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <HeaderContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </HeaderContext.Provider>
  );
};
