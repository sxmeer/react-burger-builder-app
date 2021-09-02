import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import { connect } from 'react-redux'



class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }
  toggleHandler = () => {
    this.setState((prevState) => (
      { showSideDrawer: !prevState.showSideDrawer }
    ));
  }

  render() {
    return (
      <Aux>
        <Toolbar isAuthenticated={this.props.isAuthenticated} toggleHandler={this.toggleHandler} />
        <SideDrawer isAuthenticated={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>
          <div>{this.props.children}</div>
        </main>
      </Aux>
    )
  }

};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);