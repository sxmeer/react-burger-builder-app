import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';

import classes from './Auth.css';
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email ID'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Enter Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }
    this.setState({ controls: updatedControls });
  }

  switchModeHandler = () => {
    this.setState(prevState => ({ isSignup: !prevState.isSignup }));
  }

  render() {
    let formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let formInputElements = formElements.map(formElement => (
      <Input
        changed={(event) => this.inputChangeHandler(event, formElement.id)}
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        value={formElement.config.value}
      />
    ));
    if (this.props.loading) {
      formInputElements = <Spinner />;
    }
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.onSubmitHandler}>
          {formInputElements}
          <Button disabled={this.props.loading} type="Success">{this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}</Button>
        </form>
        <Button disabled={this.props.loading} clicked={this.switchModeHandler} type="Danger">SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthDirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);