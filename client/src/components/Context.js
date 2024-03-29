import { createContext, useReducer } from "react";

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
      case "logout":
        return {
          user: {},
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
      case "editUser":
        const editUser = [...state.user];

        const idx = editUser.findIndex(
          (item) => item._id === action.payload._id
        );

        editUser[idx] = { ...action.payload };
        console.log("reducer ~ editUser", editUser[idx]);

        return {
          ...state,
          user: [...editUser],
        };
      case "editUser2":
        const editUser2 = [...state.user];

        const idx2 = editUser2.findIndex(
          (item) => item._id === action.payload._id
        );

        editUser2[idx2] = { ...action.payload };
        console.log("reducer ~ editUser", editUser2[idx2]);

        return {
          ...state,
          user: [...editUser2],
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
        console.log("Removing task with ID:", action.payload);
        // filter state (taskList) to remove the deleted task
        const oldTaskList = state.taskList
          ? [...state.taskList.filter((item) => item._id !== action.payload)]
          : [];
        console.log("New task list:", oldTaskList);
        return {
          ...state,
          taskList: [...oldTaskList],
        };

      case "taskConfirm":
        return {
          ...state,
          user: {
            ...state.user,
            task: [action.payload],
            // cart: [...state.user.cart, action.payload],
          },
        };

      case "deleteFromConfirm":
        const updatedUser = { ...state.user };
        updatedUser.taskList = updatedUser.taskList.filter(
          (taskId) => taskId !== action.payload
        );
        return {
          ...state,
          user: updatedUser,
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
