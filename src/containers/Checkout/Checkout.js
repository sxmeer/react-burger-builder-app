import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from "react-router-dom";

import { connect } from 'react-redux';

class Checkout extends Component {

  continuePurchaseHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  cancelPurchaseHandler = () => {
    this.props.history.goBack();
  }

  render() {
    let content = <Redirect to="/" />;
    if (this.props.ings) {
      let purchasedRedirection = this.props.purchased ? <Redirect to="/" /> : null;
      content = (
        <div>
          {purchasedRedirection}
          <CheckoutSummary
            cancelPurchase={this.cancelPurchaseHandler}
            continuePurchase={this.continuePurchaseHandler}
            ingredients={this.props.ings} />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData} />
        </div>
      )
    }
    return content;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);