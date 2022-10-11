import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import * as AuthService from "../../services/auth.service";

const PrivateRoute2 = () => {
  const auth = AuthService.getCurrentUser(); // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

function PrivateRoute({ children }: { children: JSX.Element }) {
  let auth = AuthService.getCurrentUser();
  let location = useLocation();

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;
