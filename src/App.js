import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ProvideAuth } from "./Auth.js";
import {Login} from './pages/Login'
import {PrivateRoute} from './pages/Protect'
import {User} from './pages/User'

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <PrivateRoute path="/">
              <User/>
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}