import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { hydrate } from "./features/login/loginSlice";

function getTokenFromStorage(): { token: string } | null {
  const persistedState = localStorage.getItem('geplauderState');

  if (persistedState === null) {
    return null;
  }

  return JSON.parse(persistedState);
}

const token = getTokenFromStorage();
if (token) {
  store.dispatch(hydrate(token));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
