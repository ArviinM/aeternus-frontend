import PrimeReact from "primereact/api";
import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { CSSTransition } from "react-transition-group";

import DashboardTopBar from "./DashboardTopBar";
import DashboardMenu from "./DashboardMenu";
import DeceasedTable from "./DeceasedTable";
import DashboardHome from "./DashboardHome";

import { Route, Routes } from "react-router-dom";

const DashboardMain: React.FC = () => {
  const [layoutMode, setLayoutMode] = useState<string>("static");
  const [layoutColorMode, setLayoutColorMode] = useState<string>("light");
  const [inputStyle, setInputStyle] = useState<string>("outlined");
  const [ripple, setRipple] = useState<boolean>(true);
  const [staticMenuInactive, setStaticMenuInactive] = useState<boolean>(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState<boolean>(false);
  const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] =
    useState<boolean>(false);

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
        { label: "User", icon: "pi pi-fw pi-user", to: "/users" },
      ],
    },
  ];

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <DashboardTopBar
        onToggleMenuClick={onToggleMenuClick}
        layoutColorMode={layoutColorMode}
        mobileTopbarMenuActive={mobileTopbarMenuActive}
        onMobileTopbarMenuClick={onMobileTopbarMenuClick}
        onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
      />

      <div className="layout-sidebar" onClick={onSidebarClick}>
        <DashboardMenu
          model={menu}
          onMenuItemClick={onMenuItemClick}
          layoutColorMode={layoutColorMode}
        />
      </div>

      <div className="layout-main-container">
        <div className="layout-main">
          <Routes>
            <Route path="/home" element={<DashboardHome />} />
            <Route path="/deceased-table" element={<DeceasedTable />} />
          </Routes>
        </div>
      </div>

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
