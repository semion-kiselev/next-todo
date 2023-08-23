'use client'

import {createContext, useContext, FC, ReactNode, useState} from "react";

const CountContext = createContext({ count: 0, inc: () => console.log("") });

export const useCountContext = () => useContext(CountContext);

export const CountContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);
  const inc = () => setCount(c => c + 1);
  const value = {
    count,
    inc,
  };

  return (
    <CountContext.Provider value={value}>
      {children}
    </CountContext.Provider>
  );
};
