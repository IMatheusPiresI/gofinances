import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { useSelector } from "react-redux";

const Routes = () => {
  const user = useSelector((state: any) => state.authReducer.login);

  const isLogged = () => {
    if (user) {
      return <AppRoutes />;
    } else {
      return <AuthRoutes />;
    }
  };

  return <NavigationContainer>{isLogged()}</NavigationContainer>;
};
export default Routes;
