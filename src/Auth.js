import React, {useContext, createContext} from "react"
import axios from 'axios'

const authContext = createContext()

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>
          {children}
         </authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

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
        cb_success(res.data.message)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function"){
        cb_error(error.response.data.message)
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
        cb_success(res.data.message)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function" && error.response.status === 400){
        cb_error(error.response.data.message)
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
          cb_success(res.data.message)
        }
      }).catch(error => {
        if(typeof(cb_error) == "function"){
          cb_error(error.response.data.message)
        }
      })
    }

  // remove user
  const remove = (id, cb_success = null, cb_error = null) => {
    axios.delete(
      `http://localhost:4000/api/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).then(res => {
      if(typeof(cb_success) == "function"){
        cb_success(res.data.message)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function"){
        cb_error(error.response.data.message)
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
          cb_success(res.data.message)
        }
      }).catch(error => {
        if(typeof(cb_error) == "function"){
          cb_error(error.response.data.message)
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
        cb_success(res.data.message)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function"){
        cb_error(error.response.data.message)
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
        cb_success(res.data.message)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function"){
        cb_error(error.response.data.message)
      }
    })
  }

  const sendPasswordResetEmail = (email, cb_success = null, cb_error = null) => {
    axios.post(
      `http://localhost:4000/api/user/reset-password`, {email}
    ).then(res => {
      if(typeof(cb_success) == "function"){
        cb_success(res.data.message)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function"){
        cb_error(error.response.data.message)
      }
    })
  }

  const confirmPasswordReset = (token, password, cb_success = null, cb_error = null) => {
    axios.put(
      `http://localhost:4000/api/user/reset-password/${token}`, {password}
    ).then(res => {
      if(typeof(cb_success) == "function"){
        cb_success(res.data.message)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function"){
        cb_error(error.response.data.message)
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
    detail
  }
}