import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../../containers/Checkout/ContactData/ContactData";
import axios from "axios";
import WithErrorHandler from "../../hocs/WithErrorHandler/WithErrorHandler";

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients: ingredients, price: price });
  }

  checkoutConfirmedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutConfirmed={this.checkoutConfirmedHandler}
          checkoutCancelled={this.checkoutCancelHandler}
        />
        <Route
          path="/checkout/contact-data"
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
            />
          )}
        />
      </div>
    );
  }
}

export default WithErrorHandler(Checkout, axios);
