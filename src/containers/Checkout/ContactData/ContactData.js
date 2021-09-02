import React, { Component } from "react";
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        validation: {},
        valid: true,
        value: 'fastest'
      }
    },
    formIsValid: false
  }

  purchaseHandler = (event) => {
    event.preventDefault();
    let orderDetail = {};
    for (let formElementId in this.state.orderForm) {
      orderDetail[formElementId] = this.state.orderForm[formElementId].value;
    }

    let order = {
      ingredients: this.props.ings,
      totalPrice: this.props.price,
      orderDetail: orderDetail,
      userId: this.props.userId
    };
    this.props.purchaseBurger(order, this.props.token);
  }

  inputChangeHandler = (event, formIndentifier) => {
    const formElements = { ...this.state.orderForm };
    const formElement = { ...this.state.orderForm[formIndentifier] };
    formElement.value = event.target.value;
    formElement.valid = checkValidity(event.target.value, formElement.validation);
    formElement.touched = true;
    formElements[formIndentifier] = formElement;
    let formIsValid = true;
    for (let key in formElements) {
      formIsValid = formElements[key].valid && formIsValid;
    }
    this.setState({ orderForm: formElements, formIsValid: formIsValid });
  }

  render() {
    let formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form =
      <form onSubmit={this.purchaseHandler}>
        {formElements.map(formElement => (
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
        ))}
        <Button
          disabled={!this.state.formIsValid}
          type="Success">
          ORDER NOW
        </Button>
      </form>;
    if (this.props.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details</h4>
        {form}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    purchaseBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));