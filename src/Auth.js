import React, { useState, useContext, createContext } from "react";
import { message } from 'antd';
import axios from 'axios';
import FetchApi from './FetchApi'

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>
          {children}
         </authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const signin = (payload, cb_success = null, cb_error = null) => {
    axios.post(
      'http://localhost:4000/api/user/login', {
        email: payload.email,
        password: payload.password
      }
    ).then(res => {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
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
  const signup = (formData, cb_success = null, cb_error = null) => {
    const config = {
      "headers": {
        "content-type": 'multipart/form-data'
      }
    }
    axios.post(
      'http://localhost:4000/api/user', formData, config
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

    // updated user
    const update = (id, formData, cb_success = null, cb_error = null) => {
      const config = {
        "headers": {
          "content-type": 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      axios.put(
        `http://localhost:4000/api/user/${id}`, formData, config
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

    // detail user
    const detail = (id, cb_success = null, cb_error = null) => {
      axios.get(
        `http://localhost:4000/api/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      ).then(res => {
        if(typeof(cb_success) == "function"){
          cb_success(res)
        }
      }).catch(error => {
        if(typeof(cb_error) == "function"){
          cb_error()
        }
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
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    remove,
    update,
    paginate,
    detail
  };
}