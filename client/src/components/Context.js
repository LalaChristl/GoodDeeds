import { createContext, useReducer, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const initialState = {
    user: {},
    marker: [],
    address: "",
    address1: "",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          user: { ...action.payload },
        };

      case "loadCoords":
        return {
          ...state,
          marker: [...action.payload],
        };

      case "addCoords":
        return {
          ...state,
          marker: [...state.marker, action.payload],
        };

      case "removeMarker":
        // filter state (user) to remove the deleted user
        const oldMarker = [
          ...state.marker.filter((item) => item._id !== action.payload),
        ];

        return {
          ...state,
          marker: [...oldMarker],
        };
      case "address":
        return {
          ...state,
          address: action.payload,
        };
      case "address1":
        return {
          ...state,
          address1: action.payload,
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
