import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/asynComponent/asyncComponent';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const asynAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});
const asynOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})
const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})

class App extends Component {

  componentDidMount() {
    this.props.checkForAutoLogin();
  }

  render() {
    let routes =
      <Switch>
        <Route path="/auth" component={asynAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>;

    if (this.props.isAuthenticated) {
      routes =
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asynOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asynAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>;
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkForAutoLogin: () => dispatch(actions.checkAuthState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
