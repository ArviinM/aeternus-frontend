import { Close } from "@mui/icons-material";
import React from "react";
import { NavLink } from "react-router-dom";

const MenuItems = ({ showMenu, active }: { showMenu: any; active: any }) => {
  return (
    <ul
      className={
        active
          ? "flex-col flex items-center fixed inset-0 bg-black/40 text-white backdrop-blur-lg gap-8 justify-center p-8 xl:hidden z-[5000] text-2xl"
          : "hidden"
      }
    >
      <Close onClick={showMenu} className="cursor-pointer" />
      <li>
        <NavLink
          to={"/home"}
          className={({ isActive }) =>
            isActive
              ? "text-white mx-1 lg:mx-1 xl:mx-4 relative group underline underline-offset-[9px] decoration-white"
              : "text-gray-300 hover:text-white mx-1 lg:mx-1 xl:mx-4 relative group"
          }
          onClick={showMenu}
        >
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-50 transition-all group-hover:w-full"></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/cemetery-map"
          className={({ isActive }) =>
            isActive
              ? "text-white mx-1 lg:mx-1 xl:mx-4 relative group underline underline-offset-[9px] decoration-white"
              : "text-gray-300 hover:text-white mx-1 lg:mx-1 xl:mx-4 relative group"
          }
          onClick={showMenu}
        >
          Cemetery Map
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-50 transition-all group-hover:w-full"></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/our-services"
          className={({ isActive }) =>
            isActive
              ? "text-white mx-1 lg:mx-1 xl:mx-4 relative group underline underline-offset-[9px] decoration-white"
              : "text-gray-300 hover:text-white mx-1 lg:mx-1 xl:mx-4 relative group"
          }
        >
          Our Services
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-50 transition-all group-hover:w-full"></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive
              ? "text-white mx-1 lg:mx-1 xl:mx-4 relative group underline underline-offset-[9px] decoration-white"
              : "text-gray-300 hover:text-white mx-1 lg:mx-1 xl:mx-4 relative group"
          }
        >
          About Us
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-50 transition-all group-hover:w-full"></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            isActive
              ? "text-white mx-1 lg:mx-1 xl:mx-4 relative group underline underline-offset-[9px] decoration-white"
              : "text-gray-300 hover:text-white mx-1 lg:mx-1 xl:mx-4 relative group"
          }
        >
          Contact Us
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-50 transition-all group-hover:w-full"></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? "text-white mx-1 lg:mx-1 xl:mx-4 relative group underline underline-offset-[9px] decoration-white"
              : "text-gray-300 hover:text-white mx-1 lg:mx-1 xl:mx-4 relative group"
          }
          onClick={showMenu}
        >
          Login
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-50 transition-all group-hover:w-full"></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive
              ? "text-white mx-1 lg:mx-1 xl:mx-4 relative group underline underline-offset-[9px] decoration-white"
              : "text-gray-300 hover:text-white mx-1 lg:mx-1 xl:mx-4 relative group"
          }
          onClick={showMenu}
        >
          Register
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-50 transition-all group-hover:w-full"></span>
        </NavLink>
      </li>
    </ul>
  );
};

export default MenuItems;
