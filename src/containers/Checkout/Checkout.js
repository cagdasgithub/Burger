import React, { Component } from "react";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../../containers/Checkout/ContactData/ContactData";
import axios from "axios";
import WithErrorHandler from "../../hocs/WithErrorHandler/WithErrorHandler";
import * as actions from "../../store/actions/index";

class Checkout extends Component {
  checkoutConfirmedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutConfirmed={this.checkoutConfirmedHandler}
            checkoutCancelled={this.checkoutCancelHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return <div>{summary}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(WithErrorHandler(Checkout, axios));
