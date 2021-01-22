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
import {UserDetail} from './pages/UserDetail'
import {UpdatedUser} from './pages/UpdatedUser'
import {ForgotPassword} from './pages/ForgotPassword'
import {ResetPassword} from './pages/ResetPassword'

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route exact path="/user/signup">
            <CreatedUser/>
          </Route>
          <Route exact path="/user/forgot-password">
            <ForgotPassword/>
          </Route>
          <Route exact path="/user/reset-password/:token">
            <ResetPassword/>
          </Route>
          <PrivateRoute exact path="/user">
            <User/>
          </PrivateRoute>
          <PrivateRoute exact path="/user/profile/:id">
            <UserDetail/>
          </PrivateRoute>
          <PrivateRoute exact path="/user/:id">
            <UpdatedUser/>
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}