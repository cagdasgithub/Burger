import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "../../Order/CheckoutSummary/CheckoutSummary.module.css";

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <Burger
        style={{ width: "100%", margin: "auto" }}
        ingredients={props.ingredients}
      />
      <Button type="Danger" clicked={props.checkoutCancelled}>
        Cancel
      </Button>
      <Button type="Success" clicked={props.checkoutConfirmed}>
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
