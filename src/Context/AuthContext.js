import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const INITIAL_STATE = null;

  const SET_CURRENT_USER = (state, action) => {
      const { currentUser, typeSwtich } = action;
  
      switch (typeSwtich) {
          case "SET_USER":
              const buttonMaping = currentUser.map(({
                  type = 'button',
                  className = 'btn btn-primary',
                  onClick = () => {},
                  buttonText = 'Button',
                  iconButton = null,
                  disabled = false,
                  style = null,
                  customButton = null,
              }) => ({
                  type, className, onClick, buttonText, iconButton, disabled, style, customButton,
              }))

              return buttonMaping;
          default:
              return state;
      }
  };

  const [state, dispatch] = useReducer(SET_CURRENT_USER, INITIAL_STATE);

  return (
    <AuthContext.Provider value={{ currentUser:state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
