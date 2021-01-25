import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import {ProvideAuth} from "./components/Auth.js"
import {Login} from './pages/User/Login'
import {PrivateRoute} from './components/Protect'
import {User} from './pages/User/User'
import {CreatedUser} from './pages/User/CreatedUser'
import {UserDetail} from './pages/User/UserDetail'
import {UpdatedUser} from './pages/User/UpdatedUser'
import {ForgotPassword} from './pages/User/ForgotPassword'
import {ResetPassword} from './pages/User/ResetPassword'

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
  )
}