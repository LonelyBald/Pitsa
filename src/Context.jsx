import { createContext, useState } from "react";

export const HeaderContext = createContext({})

export const HeaderContextProvider = ({ children }) => {
    const [searchValue, setSearchValue] = useState('');
    
    return (
        <HeaderContext.Provider value={{searchValue, setSearchValue}}>
            {children}
        </HeaderContext.Provider>
    )
}