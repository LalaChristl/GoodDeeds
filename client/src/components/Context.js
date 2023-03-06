import { createContext, useReducer, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const initialState = {
    user: {},
    marker: [],
    address: "",
    address1: "",
    task: {
      task: "",
      taskDate: "",
      taskTime: "",
      location: "",
      taskDetails: "",
      coordinates: [],
    },
    taskList: [], // Add taskList property here
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
      case "getUser2":
        return {
          ...state,
          user: action.payload,
        };
      case "addTask":
        return {
          ...state,
          task: action.payload,
        };
      case "listTask":
        return {
          ...state,
          taskList: action.payload,
        };
      case "removeTask":
        // filter state (tasks) to remove the deleted task
        const oldTasks = [
          ...state.tasks.filter((item) => item._id !== action.payload),
        ];

        return {
          ...state,
          tasks: [...oldTasks],
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
