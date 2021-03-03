import React, {useContext, createContext} from 'react'
import axios from 'axios'
import {io} from 'socket.io-client'
import {notification} from 'antd'

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
  const socketDomain = process.env.REACT_APP_SOCKET
  const apiDomain = process.env.REACT_APP_API

  const socket = io(socketDomain, {
      transports: ['websocket'],  // https://stackoverflow.com/a/52180905/8987128
      allowUpgrades: false,
      reconnect: false,
      secure: true,
      rejectUnauthorized: false
  })

  const handleError = (error, history) => {
    if(error.response.status === 401){
      localStorage.removeItem('token')
      history.replace('/login')
    }else if(error.response.status === 404){
      history.replace('/404')
    }else if(error.response.status === 500){
      history.replace('/500')
    }else if(error.response.status === 400 || error.response.status === 403){
      let message = ''
      if(Array.isArray(error.response.data.message)){
        message = error.response.data.message[0].msg
      }else{
        message = error.response.data.message
      }
      notification['error']({
        message: message
      })
    }
  }

  const signin = (payload, cb_success = null, cb_error = null) => {
    axios.post(
      `${apiDomain}/api/user/login`, {
        email: payload.email,
        password: payload.password
      }
    ).then(res => {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      if(typeof(cb_success) == 'function'){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == 'function'){
        cb_error(error)
      }
    })
  }

  // signup user
  const signup = (formData, cb_success = null, cb_error = null) => {
    const config = {
      'headers': {
        'content-type': 'multipart/form-data'
      }
    }
    axios.post(
      `${apiDomain}/api/user`, formData, config
    ).then(res => {
      if(typeof(cb_success) == 'function'){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == 'function'){
        cb_error(error)
      }
    })
  }

  // updated user
  const update = (id, formData, cb_success = null, cb_error = null) => {
    const config = {
      'headers': {
        'content-type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.put(
      `${apiDomain}/api/user/${id}`, formData, config
    ).then(res => {
      if(typeof(cb_success) == 'function'){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == 'function'){
        cb_error(error)
      }
    })
  }

  // remove user
  const remove = (id, cb_success = null, cb_error = null) => {
    axios.delete(
      `${apiDomain}/api/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).then(res => {
      if(typeof(cb_success) == 'function'){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == 'function'){
        cb_error(error)
      }
    })
  }

  // detail user
  const detail = (id, cb_success = null, cb_error = null) => {
    axios.get(
      `${apiDomain}/api/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).then(res => {
      if(typeof(cb_success) == 'function'){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == 'function'){
        cb_error(error)
      }
    })
  }

  // user paginate
  const paginate = (filter = '', cb_success = null, cb_error = null) => {
    axios.get(
      `${apiDomain}/api/user/${filter}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).then(res => {
      if(typeof(cb_success) == 'function'){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == 'function'){
        cb_error(error)
      }
    })
  }

  // get all users
  const index = (filter = '', cb_success = null, cb_error = null) => {
    axios.get(
      `${apiDomain}/api/user/all/${filter}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).then(res => {
      if(typeof(cb_success) == 'function'){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == 'function'){
        cb_error(error)
      }
    })
  }

  const signout = (cb_success = null, cb_error = null) => {
    const config = {
      'headers': {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.post(
      `${apiDomain}/api/user/logout`, {} ,config
    ).then(res => {
      if(typeof(cb_success) == 'function'){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == 'function'){
        cb_error(error)
      }
    })
  }

  const sendPasswordResetEmail = (email, cb_success = null, cb_error = null) => {
    axios.post(
      `${apiDomain}/api/user/reset-password`, {email}
    ).then(res => {
      if(typeof(cb_success) == 'function'){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == 'function'){
        cb_error(error)
      }
    })
  }

  const confirmPasswordReset = (token, password, cb_success = null, cb_error = null) => {
    axios.put(
      `${apiDomain}/api/user/reset-password/${token}`, {password}
    ).then(res => {
      if(typeof(cb_success) == 'function'){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == 'function'){
        cb_error(error)
      }
    })
  }

  const chat = (filter = '', cb_success = null, cb_error = null) => {
    axios.get(
      `${apiDomain}/api/chat/${filter}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).then(res => {
      if(typeof(cb_success) == 'function'){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == 'function'){
        cb_error(error)
      }
    })
  }
  
  const createdChat = (formData, cb_success = null, cb_error = null) => {
    const config = {
      'headers': {
        'content-type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.post(
      `${apiDomain}/api/chat`, formData, config
    ).then(res => {
      if(typeof(cb_success) == 'function'){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == 'function'){
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
    index,
    chat,
    createdChat,
    handleError
  }
}