import React, { createContext } from 'react'
const GlobalContext2 = createContext();
export default GlobalContext2;
export function GlobalContextProvider2({ children }) {
    const value2 = 201;
    return (
        <GlobalContext2.Provider value={{ value2 }}>
            {children}
        </GlobalContext2.Provider>
    )
}
