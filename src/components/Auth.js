import React, {useContext, createContext} from "react"
import axios from 'axios'
import {io} from "socket.io-client"

const authContext = createContext()

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const host = "http://localhost:5000";
  const socket = io(host, {
      transports: ['websocket'],  // https://stackoverflow.com/a/52180905/8987128
      allowUpgrades: false,
      reconnect: false,
      secure: true,
      rejectUnauthorized: false
  })

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
      if(typeof(cb_error) == "function"){
        cb_error(error)
      }
    })
  }

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
      if(typeof(cb_success) == "function"){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function" && error.response.status === 400){
        cb_error(error)
      }
    })
  }

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
      if(typeof(cb_success) == "function"){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function"){
        cb_error(error)
      }
    })
  }

  // remove user
  const remove = (id, cb_success = null, cb_error = null) => {
    console.log('4', cb_success)
    axios.delete(
      `http://localhost:4000/api/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).then(res => {
      if(typeof(cb_success) == "function"){
        console.log('2', cb_success)
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function"){
        cb_error(error)
      }
    })
  }

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
        cb_error(error)
      }
    })
  }

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
      if(typeof(cb_error) == "function"){
        cb_error(error)
      }
    })
  }

  // get all users
  const index = (filter = '', cb_success = null, cb_error = null) => {
    axios.get(
      `http://localhost:4000/api/user/all/${filter}`, {
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
        cb_error(error)
      }
    })
  }

  const signout = (cb_success = null, cb_error = null) => {
    const config = {
      "headers": {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.post(
      `http://localhost:4000/api/user/logout`, {} ,config
    ).then(res => {
      if(typeof(cb_success) == "function"){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function"){
        cb_error(error)
      }
    })
  }

  const sendPasswordResetEmail = (email, cb_success = null, cb_error = null) => {
    axios.post(
      `http://localhost:4000/api/user/reset-password`, {email}
    ).then(res => {
      if(typeof(cb_success) == "function"){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function"){
        cb_error(error)
      }
    })
  }

  const confirmPasswordReset = (token, password, cb_success = null, cb_error = null) => {
    axios.put(
      `http://localhost:4000/api/user/reset-password/${token}`, {password}
    ).then(res => {
      if(typeof(cb_success) == "function"){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function"){
        cb_error(error)
      }
    })
  }
  
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
    detail,
    socket,
    index
  }
}