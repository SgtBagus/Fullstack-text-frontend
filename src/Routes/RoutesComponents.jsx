import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { AuthContext } from "../Context/AuthContext";

import { LayoutDefault } from "../Layouts";

import Login from "../Pages/Auth/Login";
import Dashboard from "../Pages/Dashboard";
import Users from "../Pages/Users";

const RoutesComponents = () => {
  const { currentUser, isLoading } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!isLoading) {
      if (!currentUser) {
        return <Navigate to="/login" />;
      }
    }

    return children;
  };

  const RenderDefaultLayout = (page, pageName, path) => (
    <LayoutDefault pageName={pageName} path={path}>
      {page}
    </LayoutDefault>
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            {RenderDefaultLayout(<Dashboard />, "Dashboard", "/")}
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            {RenderDefaultLayout(<Users />, "Users", "/users")}
          </ProtectedRoute>
        }
      />

      <Route exact path="/Login" element={<Login />} />
    </Routes>
  );
};

export default RoutesComponents;
