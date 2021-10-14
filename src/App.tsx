import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthenticatedRoute } from "./app/router";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Index from "./pages/Index";
import UserSettings from "./pages/UserSettings";

function App(): JSX.Element {
  return (<Router>
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <AuthenticatedRoute path="/settings">
          <Settings />
          <UserSettings />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/">
          <Index />
        </AuthenticatedRoute>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
