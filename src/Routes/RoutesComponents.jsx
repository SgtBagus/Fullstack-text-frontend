import { Route, Routes } from "react-router-dom";

import { LayoutDefault } from "../Layouts";

import Login from "../Pages/Auth/Login";
import Dashboard from "../Pages/Dashboard";

const RenderDefaultLayout = (page, pageName, path) => (
    <LayoutDefault pageName={pageName} path={path} >
      {page}
    </LayoutDefault>
  )

const RoutesComponents = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={RenderDefaultLayout(<Dashboard />, "Dashboard", "/")}
            />
            <Route exact path="/" element={<Dashboard />} />

            <Route exact path="/Login" element={<Login />} />
        </Routes>
    );
};

export default RoutesComponents;
