import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import DashboardMain from "./components/dashboard/DashboardMain";

import Home from "./components/pages/Home";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
import NotFound from "./components/authentication/NotFound";
import PrivateRoute from "./components/authentication/PrivateRoute";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import CemeteryMap from "./components/pages/CemeteryMap";

const NavbarLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cemetery-map" element={<CemeteryMap />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <DashboardMain />
            </PrivateRoute>
          }
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
