import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
  state = {
    showPurchaseModal: false
  };

  updatePurchasable(passedIngredients) {
    const ingredients = { ...passedIngredients };
    const sum = Object.keys(ingredients).map(igKey => ingredients[igKey]).reduce((sum, el) => sum + el, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ showPurchaseModal: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  closePurchaseHandler = () => {
    this.setState({ showPurchaseModal: false });
  }

  continuePurchaseHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push({ pathname: '/checkout' });
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.props.error ? <p style={{ textAlign: 'center' }}>Ingredients couldn't be loaded</p> : <Spinner />
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.price}
            disabledInfo={disabledInfo}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            purchasable={this.updatePurchasable(this.props.ings)}
            isAuth={this.props.isAuth}
            ordered={this.purchaseHandler} />
        </Aux>
      );
      orderSummary = (<OrderSummary
        totalPrice={this.props.price}
        closePurchase={this.closePurchaseHandler}
        continuePurchase={this.continuePurchaseHandler}
        ingredients={this.props.ings} />);
    }

    return (
      <Aux>
        <Modal
          show={this.state.showPurchaseModal}
          purchasing={this.state.purchasing}
          closeModal={this.closePurchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ing) => dispatch(actions.addIngredient(ing)),
    onIngredientRemoved: (ing) => dispatch(actions.removeIngredient(ing)),
    onInitIngredients: () => dispatch(actions.setIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthDirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));