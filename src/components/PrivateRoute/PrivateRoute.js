import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isAuth }) => {
    if(!isAuth) {
        return <Navigate to="/auth/login/"/>;
    }

    return <Outlet/>
}

export default PrivateRoute;