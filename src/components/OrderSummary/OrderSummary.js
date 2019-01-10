import React from "react";
import Aux from "../../hocs/Aux";
import Button from "../UI/Button/Button";

const orderSummary = props => {
  let ingredientSummary = Object.keys(props.ingredients).map(ingKey => (
    <li key={ingKey}>
      <span style={{ textTransform: "capitalize" }}>{ingKey}</span>:{" "}
      {props.ingredients[ingKey]}
    </li>
  ));
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Your Total: {props.total}</p>
      <p>Continue to checkout?</p>
      <Button clicked={props.purchased} type="Success">
        {" "}
        Confirm
      </Button>
      <Button clicked={props.canceled} type="Danger">
        Cancel
      </Button>
    </Aux>
  );
};

export default orderSummary;
