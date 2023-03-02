import { LinearProgress, useMediaQuery } from "@material-ui/core";
import {
  Sidebar,
  SidebarDrawer,
  useActionBar,
  useBacklink,
  useTheme,
} from "@saleor/macaw-ui";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Container from "../../components/Container";
import { SidebarLink } from "./components/SidebarLink";
import UserCard from "./components/UserCard";
import MenuStructure from "./MenuStructure";
import { useFullSizeStyles, useStyles } from "./styles";
import clsx from "clsx";
import { useSelector } from "react-redux";

const props = {
  activeId: "menu",
  menuItems: MenuStructure,
  logoHref: "/",
  onMenuItemClick: () => undefined,
  linkComponent: SidebarLink,
};

const AppSidebar = ({ fullSize = false }) => {
  const classes = useStyles();
  const appHeaderAnchor = useBacklink();
  const { themeType, setTheme } = useTheme();
  const { anchor: appActionAnchor } = useActionBar();
  const fullSizeClasses = useFullSizeStyles();
  const isAppLoading = useSelector((state) => state.app.isAppLoading);
  const isDarkTheme = themeType === "dark";

  const toggleTheme = () => {
    setTheme(!isDarkTheme ? "dark" : "light");
  };
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    // setTimeout(() => {
    //     const sidebarLogo = document.querySelector('[class^="SideBar-logo"]');
    //     if(!sidebarLogo) return;
    //     sidebarLogo.innerHTML = "";
    //     sidebarLogo.classList.add("sidebar-logo");
    // }, 0)
  }, []);

  return (
    <div className={classes.root}>
      {isMdUp && <Sidebar {...props} />}
      <div
        className={clsx(classes.content, {
          [fullSizeClasses.content]: fullSize,
        })}
      >
        {isAppLoading ? (
          <LinearProgress className={classes.appLoader} color="primary" />
        ) : (
          <div className={classes.appLoaderPlaceholder} />
        )}
        <div
          className={clsx(classes.viewContainer, {
            [fullSizeClasses.viewContainer]: fullSize,
          })}
        >
          <div>
            <Container>
              <div className={classes.header}>
                <div className={classes.headerAnchor} ref={appHeaderAnchor} />
                <div className={classes.headerToolbar}>
                  {!isMdUp && (
                    <SidebarDrawer
                      menuItems={MenuStructure}
                      logoHref="/"
                      onMenuItemClick={() => undefined}
                      linkComponent={SidebarLink}
                    />
                  )}
                  <div className={classes.spacer} />
                  <div className={classes.userBar}>
                    <UserCard
                      isDarkThemeEnabled={isDarkTheme}
                      onThemeToggle={toggleTheme}
                    />
                  </div>
                </div>
              </div>
            </Container>
          </div>
          <main
            className={clsx(classes.view, {
              [classes.viewMargins]: !fullSize,
              [fullSizeClasses.view]: fullSize,
            })}
          >
            <Outlet />
          </main>
        </div>
        <div className={classes.appAction} ref={appActionAnchor} />
      </div>
    </div>
  );
};

export default AppSidebar;
