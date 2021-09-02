import React from 'react';
import classes from './Order.css';
const order = props => {
  let ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({ name: key, amount: props.ingredients[key] });
  }
  let ingredientsOutput = ingredients.map(ing =>
    <span
      style={{
        margin: '2px 8px',
        display: 'inline-block',
        textTransform: 'capitalize',
        padding: '8px',
        border: '1px solid black',
        boxSizing: 'border-box'
      }}
      key={ing.name}>
      {ing.name}:{ing.amount}
    </span>);
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: USD <span style={{ fontWeight: 'bold' }}>{props.totalPrice.toFixed(2)}</span></p>
    </div>
  );
}

export default order;