import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthenticatedRoute } from "./app/router";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ChannelSettings from "./pages/ChannelSettings";
import Index from "./pages/Index";
import ServerSettings from "./pages/ServerSettings";
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
          <UserSettings />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/server-settings">
          <ServerSettings />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/channel-settings/:id">
          <ChannelSettings />
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
