import React from "react";
import Logo from "../../assets/images/Logo/burger-logo.png";
import classes from "../Logo/Logo.module.css";

const logo = props => {
  return <img className={classes.Logo} src={Logo} alt="logo" />;
};

export default logo;
