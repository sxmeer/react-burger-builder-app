import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientType) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientType: ingredientType
  };
};

export const removeIngredient = (ingredientType) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientType: ingredientType
  };
};

export const storeIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const setIngredients = () => {
  return dispatch => {
    axios.get('https://burger-builder-app-713e2-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(storeIngredients(response.data));
      }).catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  }
}