import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem click={props.clicked} link="/" exact>Burger Builder</NavigationItem>
      {props.isAuthenticated ? <NavigationItem click={props.clicked} link="/orders">Orders</NavigationItem> : null}
      {!props.isAuthenticated ?
        <NavigationItem click={props.clicked} link="/auth">Authenticate</NavigationItem> :
        <NavigationItem click={props.clicked} link="/logout">Log Out</NavigationItem>
      }
    </ul>
  )
};

export default navigationItems;