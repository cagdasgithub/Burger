import React, { Component } from "react";
import classes from "../ContactData/ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    loading: false
  };
  orderHandler = () => {
    this.setState({ loading: true });
    const data = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Cagdas",
        address: {
          street: "Daly Ave",
          zipcode: "K1N 6G1",
          country: "Canada"
        },
        email: "cagdas.essiz@gmail.com",
        deliveryMethod: "fastest"
      }
    };
    axios
      .post("/orders.json", data)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  };
  render() {
    let form = (
      <form className={classes.ContactData}>
        <input
          className={classes.Input}
          type="text"
          name="Name"
          placeholder="Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="Street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="Postal"
          placeholder="Postal"
        />
        <Button type="Success" clicked={this.orderHandler}>
          Order Now
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div>
        <h4>Please fill in your information</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
