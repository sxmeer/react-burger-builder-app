import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render() {
    let ingredientList = Object.keys(this.props.ingredients)
      .map(igKey =>
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey} : </span>
          {this.props.ingredients[igKey]}
        </li>)

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients</p>
        {ingredientList}
        <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button type="Danger" clicked={this.props.closePurchase}>Cancel</Button>
        <Button type="Success" clicked={this.props.continuePurchase}>Continue</Button>
      </Aux>
    );
  }
};

export default OrderSummary;