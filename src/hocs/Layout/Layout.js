import React, { Component } from "react";
import { connect } from "react-redux";
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
        <Toolbar
          toggleSideDrawer={this.toggleSideDrawerHandle}
          isAuth={this.props.isAuthenticated}
        />
        <SideDrawer
          open={this.state.showDrawer}
          closed={this.hideSideDrawerHandle}
          isAuth={this.props.isAuthenticated}
        />
        <main className={classes.Margin}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
