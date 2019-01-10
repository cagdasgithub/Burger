import React, { Component } from "react";
import Aux from "../../hocs/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hocs/WithErrorHandler/WithErrorHandler";

const INGREDIENT_PRICES = {
  meat: 1,
  cheese: 0.2,
  salad: 0.1,
  bacon: 0.2
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      salad: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("/ingredients.json")
      .then(res => this.setState({ ingredients: res.data, loading: false }));
  }

  addIngredientHandler = type => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] += 1;
    const newTotal = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      totalPrice: newTotal,
      ingredients: updatedIngredients,
      purchasable: true,
      purchasing: false
    });
  };

  removeIngredientHandler = type => {
    const updatedIngredients = { ...this.state.ingredients };
    if (updatedIngredients[type] === 0) return;
    updatedIngredients[type] -= 1;
    const newTotal = this.state.totalPrice - INGREDIENT_PRICES[type];

    let sum = Object.keys(updatedIngredients).reduce(
      (acc, type) => acc + updatedIngredients[type]
    );

    this.setState({
      totalPrice: newTotal,
      ingredients: updatedIngredients,
      purchasable: sum > 0 ? true : false
    });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  confirmPurchaseHandler = () => {
    this.setState({ loading: true });
    const data = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
      .post("/orders", data)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = <Spinner />;
    let burger = <Spinner />;

    if (!this.state.loading) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          total={this.state.totalPrice}
          purchased={this.confirmPurchaseHandler}
          canceled={this.cancelPurchaseHandler}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            price={this.state.totalPrice}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            purchased={this.purchaseHandler}
          />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchaseHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
