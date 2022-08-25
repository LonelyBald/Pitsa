import React, { createContext, useState } from 'react';

interface HeaderContextProviderTypes {
  children: React.ReactNode;
}
interface HeaderContextInitialValueType {
  searchValue?: string;
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
}

export const HeaderContext: React.Context<HeaderContextInitialValueType> =
  createContext({});
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
