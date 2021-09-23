import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { hydrate } from './store/reducers/auth';

const getBearerTokenFromStorage = () => {
  const persistedState = localStorage.getItem('geplauderState');

  return JSON.parse(persistedState);
};

const bearerToken = getBearerTokenFromStorage();
if (bearerToken) {
  store.dispatch(hydrate(bearerToken.auth));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
