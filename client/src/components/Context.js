import { createContext, useReducer, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const initialState = {
    user: {},
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          user: { ...action.payload },
        };

      default:
        return;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}> {children}</Context.Provider>
  );
};

export default ContextProvider;
