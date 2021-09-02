import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';

const combinedReducers = combineReducers({
  order: orderReducer,
  burgerBuilder: burgerBuilderReducer,
  auth: authReducer
});

const composeEnhancers = process.env.NODE_ENV === 'development' ?
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  : null || compose;

const store = createStore(combinedReducers, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
