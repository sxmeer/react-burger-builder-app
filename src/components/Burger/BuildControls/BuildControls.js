import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';
const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
        <BuildControl
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          key={ctrl.label}
          disabled={props.disabledInfo[ctrl.type]}
          label={ctrl.label} />
      ))}
      <button
        onClick={props.ordered}
        className={classes.OrderButton}
        disabled={!props.purchasable}>{props.isAuth ? 'Order Now' : 'Sign up to Order'}</button>
    </div>
  );
};

export default buildControls;