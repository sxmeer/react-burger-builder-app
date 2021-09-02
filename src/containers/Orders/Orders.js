import React, { Component } from "react";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrder(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />
    if (!this.props.loading) {
      if (this.props.orders === null || this.props.orders.length < 1) {
        orders = <p style={{ textAlign: 'center' }}>No orders yet :/</p>
      } else {
        orders = this.props.orders.map(order => {
          return <Order key={order.id} ingredients={order.ingredients} totalPrice={order.totalPrice} />
        })
      }

    }
    return orders;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrder: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));