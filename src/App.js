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
import {CreatedUser} from './pages/CreatedUser'

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <PrivateRoute exact path="/user">
              <User/>
          </PrivateRoute>
          <PrivateRoute exact path="/user/signup">
              <CreatedUser/>
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}