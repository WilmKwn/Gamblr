import React, { createContext, useReducer, useContext } from 'react';

// Define initial state
const initialState = {
  username: '',
};

// Create a context
const GlobalContext = createContext();

// Create a reducer function to handle state changes
const globalReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USERNAME':
      return { ...state, username: action.payload };
    default:
      return state;
  }
};

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Create a custom hook to use the global state in components
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};