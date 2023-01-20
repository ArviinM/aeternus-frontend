import PrimeReact from "primereact/api";
import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { CSSTransition } from "react-transition-group";

import DashboardTopBar from "./DashboardTopBar";
import DashboardMenu from "./DashboardMenu";
import DeceasedTable from "./DeceasedTable";
import DashboardHome from "./DashboardHome";

import { Route, Routes } from "react-router-dom";
import { TabTitle } from "../../utils/GenerateFunctions";
import GravePlots from "./GravePlots";
import UserService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import IUser from "../../types/user.type";
import CemMap from "../map/CemMap";
import DashboardUserProfile from "./DashboardUserProfile";
import UserTable from "./UserTable";
import UserServiceRequestTable from "./UserServiceRequestTable";
import ServiceRequestTable from "./ServiceRequestTable";

const DashboardMain: React.FC = () => {
  TabTitle("Aeternus – Dashboard");
  const [layoutMode, setLayoutMode] = useState<string>("static");
  const [layoutColorMode, setLayoutColorMode] = useState<string>("light");
  const [inputStyle, setInputStyle] = useState<string>("outlined");
  const [ripple, setRipple] = useState<boolean>(true);
  const [staticMenuInactive, setStaticMenuInactive] = useState<boolean>(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState<boolean>(false);
  const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] =
    useState<boolean>(false);

  const [showAdmin, setShowAdmin] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  PrimeReact.ripple = true;

  let menuClick = false;
  let mobileTopbarMenuClick = false;

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }
  }, [mobileMenuActive]);

  useEffect(() => {
    const user = UserService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdmin(user.roles.includes("ROLE_ADMIN"));
    }
    EventBus.on("logout", logOut);
    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    UserService.logout();
    setShowAdmin(false);
    setCurrentUser(undefined);
  };

  const onInputStyleChange = (inputStyle: string) => {
    setInputStyle(inputStyle);
  };

  const onRipple = (e: any) => {
    PrimeReact.ripple = e.value;
    setRipple(e.value);
  };

  const onLayoutModeChange = (mode: string) => {
    setLayoutMode(mode);
  };

  const onColorModeChange = (mode: string) => {
    setLayoutColorMode(mode);
  };

  const onWrapperClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }

    if (!mobileTopbarMenuClick) {
      setMobileTopbarMenuActive(false);
    }

    mobileTopbarMenuClick = false;
    menuClick = false;
  };

  const onToggleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    menuClick = true;

    if (isDesktop()) {
      if (layoutMode === "overlay") {
        if (mobileMenuActive === true) {
          setOverlayMenuActive(true);
        }

        setOverlayMenuActive((prevState) => !prevState);
        setMobileMenuActive(false);
      } else if (layoutMode === "static") {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }

    event.preventDefault();
  };

  const onSidebarClick = () => {
    menuClick = true;
  };

  const onMobileTopbarMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    mobileTopbarMenuClick = true;

    setMobileTopbarMenuActive((prevState) => !prevState);
    event.preventDefault();
  };

  const onMobileSubTopbarMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    mobileTopbarMenuClick = true;

    event.preventDefault();
  };

  const onMenuItemClick = (event: any) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };
  const isDesktop = () => {
    return window.innerWidth >= 992;
  };

  const addClass = (element: HTMLElement, className: string) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element: HTMLElement, className: string) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  };

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive":
      staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
    "p-input-filled": inputStyle === "filled",
    "p-ripple-disabled": ripple === false,
    "layout-theme-light": layoutColorMode === "light",
  });

  const menu = [
    {
      label: "Home",
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-fw pi-home",
          to: "/dashboard/home",
        },
        {
          label: "Cemetery Map",
          icon: "pi pi-fw pi-map-marker",
          to: "/dashboard/cem-map",
        },
      ],
    },
    {
      label: "Information",
      icon: "pi pi-fw pi-database",
      items: [
        {
          label: "Deceased",
          icon: "pi pi-fw pi-book",
          to: "/dashboard/deceased-table",
        },
        {
          label: "Grave Plots",
          icon: "pi pi-fw pi-map",
          to: "/dashboard/grave-plots",
        },
        {
          label: "Users",
          icon: "pi pi-fw pi-users",
          to: "/dashboard/user-table",
        },
        {
          label: "Service Requests",
          icon: "pi pi-fw pi-heart-fill",
          to: "/dashboard/service-request",
        },
      ],
    },
    {
      label: "User Profile",
      items: [
        {
          label: "Profile",
          icon: "pi pi-fw pi-user",
          to: "/dashboard/user-profile",
        },
        {
          label: "Sign Out",
          icon: "pi pi-fw pi-sign-out",
          command: () => {
            logOut();
            window.location.href = "http://localhost:3000/";
          },
        },
      ],
    },
  ];

  const menu2 = [
    {
      label: "Home",
      items: [
        {
          label: "Request Services",
          icon: "pi pi-fw pi-pencil",
          to: "/dashboard/user-service-request",
        },
        {
          label: "Cemetery Map",
          icon: "pi pi-fw pi-map-marker",
          to: "/dashboard/cem-map",
        },
        {
          label: "Profile",
          icon: "pi pi-fw pi-user",
          to: "/dashboard/user-profile",
        },
        {
          label: "Sign Out",
          icon: "pi pi-fw pi-sign-out",
          command: () => {
            logOut();
            window.location.href = "http://localhost:3000/";
          },
        },
      ],
    },
    // {
    //   label: "Information",
    //   icon: "pi pi-fw pi-database",
    //   items: [
    //     {
    //       label: "Deceased",
    //       icon: "pi pi-fw pi-book",
    //       to: "/dashboard/deceased-table",
    //     },
    //     {
    //       label: "Grave Plots",
    //       icon: "pi pi-fw pi-map",
    //       to: "/dashboard/grave-plots",
    //     },
    //     { label: "User", icon: "pi pi-fw pi-user", to: "/users" },
    //   ],
    // },
  ];

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      {currentUser && (
        <DashboardTopBar
          onToggleMenuClick={onToggleMenuClick}
          layoutColorMode={layoutColorMode}
          mobileTopbarMenuActive={mobileTopbarMenuActive}
          onMobileTopbarMenuClick={onMobileTopbarMenuClick}
          onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
        />
      )}
      {currentUser && (
        <div className="layout-sidebar" onClick={onSidebarClick}>
          <DashboardMenu
            model={menu2}
            onMenuItemClick={onMenuItemClick}
            layoutColorMode={layoutColorMode}
          />
        </div>
      )}

      {showAdmin && (
        <div className="layout-sidebar" onClick={onSidebarClick}>
          <DashboardMenu
            model={menu}
            onMenuItemClick={onMenuItemClick}
            layoutColorMode={layoutColorMode}
          />
        </div>
      )}

      {currentUser && (
        <div className="layout-main-container">
          <div className="layout-main">
            <Routes>
              <Route path="/home" element={<DashboardHome />} />
              <Route path="/cem-map" element={<CemMap />} />
              <Route path="/user-profile" element={<DashboardUserProfile />} />
              <Route path="/deceased-table" element={<DeceasedTable />} />
              <Route path="/user-table" element={<UserTable />} />
              <Route path="/grave-plots" element={<GravePlots />} />
              <Route
                path="/user-service-request"
                element={<UserServiceRequestTable />}
              />
              <Route
                path="/service-request"
                element={<ServiceRequestTable />}
              />
            </Routes>
          </div>
        </div>
      )}
      <CSSTransition
        classNames="layout-mask"
        timeout={{ enter: 200, exit: 200 }}
        in={mobileMenuActive}
        unmountOnExit
      >
        <div className="layout-mask p-component-overlay"></div>
      </CSSTransition>
    </div>
  );
};

export default DashboardMain;
