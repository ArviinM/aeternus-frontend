import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import * as AuthService from "../../services/auth.service";
import IUser from "../../types/user.type";
import { Menu as MenuIcon } from "@mui/icons-material";
import EventBus from "../../common/EventBus";
import MenuItems from "./MenuItems";

const Navbar: React.FC = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  const [color, setColor] = useState<boolean>(false);

  const changeColor = () => {
    if (window.scrollY >= 50) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      console.log(currentUser);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
    EventBus.on("logout", logOut);
    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);
  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setShowModeratorBoard(false);
    setCurrentUser(undefined);
  };

  const [active, setActive] = useState(false);

  const showMenu = () => {
    setActive(!active);
  };

  return (
    <div>
      <nav>
        <div
          className={
            color
              ? `font-primary overflow-hidden fixed font-bold w-full bg-[#000000a9] z-[99] hidden`
              : `font-primary overflow-hidden fixed font-bold w-full z-[99]`
          }
          // className={`font-primary overflow-hidden fixed font-bold w-full `}
        >
          <div className="flex justify-between h-20 px-4 md:px-10 lg:px-12 xl:px-50 py-16 items-center bg-transparent">
            <div className="flex items-center sm:space-x-0 md:shrink-0">
              <NavLink to={"/" || "/home"}>
                <img
                  src="/aeternus-logo-light.png"
                  className="h-20 m-0 "
                  alt="CMIS Logo"
                />
              </NavLink>
            </div>

            <div className="hidden items-center xl:flex text-[max(0.7rem,min(1.44737vw,0.9rem))] tracking-wide z-99 uppercase">
              <NavLink
                to={"/" && "/home"}
                // className="hover:text-white text-gray-300  dark:text-gray-300 mx-1 lg:mx-1 xl:mx-4 relative group"
                className={({ isActive }) =>
                  isActive
                    ? "text-white mx-1 lg:mx-1 xl:mx-4 relative group underline underline-offset-[9px] decoration-white "
                    : "text-gray-300 hover:text-white mx-1 lg:mx-1 xl:mx-4 relative group "
                }
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-50 transition-all group-hover:w-full "></span>
              </NavLink>
              <NavLink
                to={"/cemetery-map"}
                className={({ isActive }) =>
                  isActive
                    ? "text-white mx-1 lg:mx-1 xl:mx-4 relative group underline underline-offset-[9px] decoration-white"
                    : "text-gray-300 hover:text-white mx-1 lg:mx-1 xl:mx-4 relative group"
                }
              >
                Cemetery Map
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-50 transition-all group-hover:w-full"></span>
              </NavLink>
              <NavLink
                to={"/deceased-table-test"}
                className={({ isActive }) =>
                  isActive
                    ? "text-white mx-1 lg:mx-1 xl:mx-4 relative group underline underline-offset-[9px] decoration-white"
                    : "text-gray-300 hover:text-white mx-1 lg:mx-1 xl:mx-4 relative group"
                }
              >
                Our Services
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-50 transition-all group-hover:w-full"></span>
              </NavLink>

              <NavLink
                to={"/about-us"}
                className={({ isActive }) =>
                  isActive
                    ? "text-white mx-1 lg:mx-1 xl:mx-4 relative group underline underline-offset-[9px] decoration-white"
                    : "text-gray-300 hover:text-white mx-1 lg:mx-1 xl:mx-4 relative group"
                }
              >
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-50 transition-all group-hover:w-full"></span>
              </NavLink>
              <NavLink
                to={"/contact-us"}
                className={({ isActive }) =>
                  isActive
                    ? "text-white mx-1 lg:mx-1 xl:mx-4 relative group underline underline-offset-[9px] decoration-white"
                    : "text-gray-300 hover:text-white mx-1 lg:mx-1 xl:mx-4 relative group"
                }
              >
                Contact Us
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-50 transition-all group-hover:w-full"></span>
              </NavLink>
              {currentUser && (
                <NavLink
                  to={"/dashboard/home"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white mx-1 lg:mx-1 xl:mx-4 relative group underline underline-offset-[9px] decoration-white"
                      : "text-gray-300 hover:text-white mx-1 lg:mx-1 xl:mx-4 relative group"
                  }
                >
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-50 transition-all group-hover:w-full"></span>
                </NavLink>
              )}
            </div>
            <MenuItems showMenu={showMenu} active={active} />
            <div className="hidden xl:flex">
              {currentUser ? (
                <div className=" items-center text-[max(0.7rem,min(1.44737vw,0.9rem))] tracking-wide">
                  <Link
                    to={"/dashboard"}
                    className="px-1 md:px-4 py-3 mx-1 lg:mx-1 xl:mx-4 text-gray-300 text-[max(0.7rem,min(1.44737vw,0.9rem))] tracking-wide relative group"
                  >
                    Hello, {currentUser.username}!
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-50 transition-all group-hover:w-full"></span>
                  </Link>
                  <a
                    href="/login"
                    className="bg-[#ffc500] hover:bg-[#e0ad02]  px-4 md:px-10 py-3 mx-1 lg:mx-1 xl:mx-4 text-[max(0.7rem,min(1.44737vw,0.9rem))] tracking-wide"
                    onClick={logOut}
                  >
                    LOG OUT
                  </a>
                </div>
              ) : (
                <div className=" items-center uppercase ">
                  <Link
                    to={"/login"}
                    className="px-1 md:px-4 py-3 mx-1 lg:mx-1 xl:mx-4 text-gray-300 text-[max(0.7rem,min(1.44737vw,0.9rem))] tracking-wide relative group"
                  >
                    Sign In
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-50 transition-all group-hover:w-full"></span>
                  </Link>
                  <Link
                    to={"/register"}
                    className="bg-[#ffc500] hover:bg-[#e0ad02]  px-4 md:px-10 py-3 mx-1 lg:mx-1 xl:mx-4 text-white text-[max(0.7rem,min(1.44737vw,0.9rem))] tracking-wide"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            <div className="flex xl:hidden scale-150  ">
              <MenuIcon
                onClick={showMenu}
                className="scale-150 cursor-pointer z-10"
                style={{ color: "white" }}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
