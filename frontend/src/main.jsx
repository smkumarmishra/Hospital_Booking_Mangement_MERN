import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({
  isAuthenticated: false,
  authResolved: false,
  menuOpen: false,
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authResolved, setAuthResolved] = useState(false);
  const [user, setUser] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        authResolved,
        setAuthResolved,
        user,
        setUser,
        menuOpen,
        setMenuOpen,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
