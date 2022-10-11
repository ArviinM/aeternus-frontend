import React, { MouseEventHandler, useState } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import { Ripple } from "primereact/ripple";
import { MenuItem } from "primereact/menuitem";
import { Badge } from "primereact";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

import "./dashboard.scss";

interface AppSubmenuProps {
  className?: string;
  items?: any;
  root?: boolean;
  onMenuItemClick?: (event: any) => void;
}

const AppSubmenu: React.FC<AppSubmenuProps> = (props: AppSubmenuProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onMenuItemClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: MenuItem,
    index: number
  ) => {
    //avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    //execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
    }

    if (index === activeIndex) setActiveIndex(null);
    else setActiveIndex(index);

    if (props.onMenuItemClick) {
      props.onMenuItemClick({
        originalEvent: event,
        item: item,
      });
    }
  };

  const renderLinkContent = (item: any) => {
    let submenuIcon = item.items && (
      <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>
    );
    let badge = item.badge && <Badge value={item.badge} />;

    return (
      <React.Fragment>
        <i className={item.icon}></i>
        <span>{item.label}</span>
        {submenuIcon}
        {badge}
        <Ripple />
      </React.Fragment>
    );
  };

  const renderLink = (item: any, i: number) => {
    let content = renderLinkContent(item);

    if (item.to) {
      return (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "router-link-active router-link-exact-active"
              : "p-ripple"
          }
          to={item.to}
          onClick={(e) => onMenuItemClick(e, item, i)}
          target={item.target}
        >
          {content}
        </NavLink>
      );
    } else {
      return (
        <a
          href={item.url}
          className="p-ripple"
          onClick={(e) => onMenuItemClick(e, item, i)}
          target={item.target}
        >
          {content}
        </a>
      );
    }
  };

  let items =
    props.items &&
    props.items.map((item: any, i: number) => {
      let active = activeIndex === i;
      let styleClass = classNames(item.badgeStyleClass, {
        "layout-menuitem-category": props.root,
        "active-menuitem": active && !item.to,
      });

      if (props.root) {
        return (
          <li className={styleClass} key={i}>
            {props.root === true && (
              <React.Fragment>
                <div className="layout-menuitem-root-text">{item.label}</div>
                <AppSubmenu
                  items={item.items}
                  onMenuItemClick={props.onMenuItemClick}
                />
              </React.Fragment>
            )}
          </li>
        );
      } else {
        return (
          <li className={styleClass} key={i}>
            {renderLink(item, i)}
            <CSSTransition
              classNames="layout-submenu-wrapper"
              timeout={{ enter: 1000, exit: 450 }}
              in={active}
              unmountOnExit
            >
              <AppSubmenu
                items={item.items}
                onMenuItemClick={props.onMenuItemClick}
              />
            </CSSTransition>
          </li>
        );
      }
    });

  return items ? <ul className={props.className}>{items}</ul> : null;
};

interface AppMenuProps {
  layoutColorMode: string;
  model: MenuItem[];
  onMenuItemClick?: (event: any) => void;
}

const DashboardMenu: React.FC<AppMenuProps> = (props: AppMenuProps) => {
  return (
    <div className="layout-menu-container">
      <AppSubmenu
        items={props.model}
        className="layout-menu"
        onMenuItemClick={props.onMenuItemClick}
        root={true}
      />
    </div>
  );
};

export default DashboardMenu;
