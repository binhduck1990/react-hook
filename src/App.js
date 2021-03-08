import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {ProvideAuth} from './components/Auth.js'
import {Login} from './pages/User/Login'
import {PrivateRoute} from './components/Protect'
import {User} from './pages/User/User'
import {CreatedUser} from './pages/User/CreatedUser'
import {UserDetail} from './pages/User/UserDetail'
import {UpdatedUser} from './pages/User/UpdatedUser'
import {ForgotPassword} from './pages/User/ForgotPassword'
import {ResetPassword} from './pages/User/ResetPassword'
import {Setting} from './pages/Setting/Setting'
import {Index} from './pages/index'
import {Page404} from './pages/404'
import {Page500} from './pages/500'
import {notification} from 'antd'
notification.config({
  top: 80,
  duration: 2
})

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path='/login'>
            <Login/>
          </Route>
          <Route exact path='/signup'>
            <CreatedUser/>
          </Route>
          <Route exact path='/forgot-password'>
            <ForgotPassword/>
          </Route>
          <Route exact path='/reset-password/:token'>
            <ResetPassword/>
          </Route>
          <PrivateRoute exact path='/'>
            <Index/>
          </PrivateRoute>
          <PrivateRoute exact path='/user'>
            <User/>
          </PrivateRoute>
          <PrivateRoute exact path='/user/profile/:id'>
            <UserDetail/>
          </PrivateRoute>
          <PrivateRoute exact path='/user/:id'>
            <UpdatedUser/>
          </PrivateRoute>
          <PrivateRoute exact path='/setting'>
            <Setting/>
          </PrivateRoute>
          <Route exact path='/404'>
            <Page404/>
          </Route>
          <Route exact path='/500'>
            <Page500/>
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  )
}