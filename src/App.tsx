import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthenticatedRoute } from "./app/router";
import Login from "./features/login/Login";
import Index from "./pages/Index";

function App(): JSX.Element {
  return (<Router>
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <AuthenticatedRoute path="/">
          <Index />
        </AuthenticatedRoute>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
