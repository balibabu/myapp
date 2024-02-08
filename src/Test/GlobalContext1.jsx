import React, { createContext } from 'react'

const GlobalContext1 = createContext();
export default GlobalContext1;

export function GlobalContextProvider1({ children }) {
    const value1 = 101;
    return (
        <GlobalContext1.Provider value={{value1}}>
            {children}
        </GlobalContext1.Provider>
    )
}
