import React, { useState, useContext, createContext } from "react";
import { message } from 'antd';
import axios from 'axios';

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>
          {children}
         </authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (payload, cb_success = null, cb_error = null) => {
    axios.post(
      'http://localhost:4000/api/user/login', {
        email: payload.email,
        password: payload.password
      }
    ).then(res => {
      setUser(res.data.user)
      localStorage.setItem('token', res.data.token)
      if(typeof(cb_success) == "function"){
        cb_success(res)
      }
    }).catch(error => {
      message.error(error.response.data.message)
      if(typeof(cb_error) == "function"){
        cb_error()
      }
    })
  };

  // signup user
  const signup = (payload, cb_success = null, cb_error = null) => {
    axios.post(
      'http://localhost:4000/api/user', {
          username: payload.name,
          email: payload.email,
          password: payload.password,
          age: payload.age,
          phone: payload.phone,
          address: payload.address
      }
    ).then(res => {
      message.success(res.data.message)
      if(typeof(cb_success) == "function"){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function" && error.response.status === 400){
        cb_error(error.response.data.message)
      }
    })
  };

  // remove user
  const remove = (id, cb_success = null, cb_error = null) => {
    axios.delete(
      `http://localhost:4000/api/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).then(res => {
      message.success(res.data.message)
      if(typeof(cb_success) == "function"){
        cb_success()
      }
    }).catch(error => {
      if(typeof(cb_error) == "function"){
        cb_error()
      }
      message.error(error.response.data.message)
    })
  };

  // user paginate
  const paginate = (filter = '', cb_success = null, cb_error = null) => {
    axios.get(
      `http://localhost:4000/api/user/${filter}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).then(res => {
      if(typeof(cb_success) == "function"){
        cb_success(res)
      }
    }).catch(error => {
      message.error(error.response.data.message)
      if(typeof(cb_error) == "function"){
        cb_error()
      }
    })
  };

  const signout = () => {

  };

  const sendPasswordResetEmail = email => {

  };

  const confirmPasswordReset = (code, password) => {

  };
  
  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    remove,
    paginate
  };
}