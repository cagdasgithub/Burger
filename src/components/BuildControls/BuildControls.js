import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price:
      <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.type}
        label={ctrl.label}
        addIngredient={() => props.ingredientAdded(ctrl.type)}
        removeIngredient={() => props.ingredientRemoved(ctrl.type)}
        disable={props.disabled[ctrl.type]}
      />
    ))}
    <button
      disabled={!props.purchasable}
      onClick={props.purchased}
      className={classes.OrderButton}
    >
      Order Now
    </button>
  </div>
);

export default buildControls;
