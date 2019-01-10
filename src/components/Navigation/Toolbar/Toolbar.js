import React from "react";
import Logo from "../../Logo/Logo";
import classes from "../Toolbar/Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.toggleSideDrawer} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <div className={classes.DesktopOnly}>
        <NavigationItems />
      </div>
    </header>
  );
};

export default toolbar;
