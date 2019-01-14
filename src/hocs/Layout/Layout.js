import React, { Component } from "react";
import Aux from "../../hocs/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showDrawer: false
  };

  toggleSideDrawerHandle = () => {
    this.setState(prevState => {
      return { showDrawer: !prevState.showDrawer };
    });
  };

  hideSideDrawerHandle = () => {
    this.setState({ showDrawer: false });
  };

  render() {
    return (
      <Aux>
        <Toolbar toggleSideDrawer={this.toggleSideDrawerHandle} />
        <SideDrawer
          open={this.state.showDrawer}
          closed={this.hideSideDrawerHandle}
        />
        <main className={classes.Margin}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
