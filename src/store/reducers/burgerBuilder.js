import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;
  }
}

const addIngredient = (state, action) => {
  const ingredients = updateObject(state.ingredients, {
    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
  });
  return updateObject(state, {
    ingredients: ingredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
    building: true
  });
}

const removeIngredient = (state, action) => {
  const ingredients = updateObject(state.ingredients, {
    [action.ingredientType]: state.ingredients[action.ingredientType] - 1
  });
  return updateObject(state, {
    ingredients: ingredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
    building: true
  });
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
    building: false
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
}

export default reducer;