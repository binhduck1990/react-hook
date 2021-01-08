import React, { useState, useEffect, useContext, createContext } from "react";
import { message } from 'antd';
import axios from 'axios';
import { Layout } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>
            <Layout>
              {children}
            </Layout>
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
  const signin = (email, password, cb) => {
    axios.post(
        'http://localhost:4000/api/user/login', {
            email: email,
            password: password
        }
    ).then(res => {
        setUser(res.data.user)
        localStorage.setItem('token', res.data.token)
        cb()
    }).catch(error => {
        message.error(error.response.data.message)
    })
  };

  const signup = (email, password) => {

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
    confirmPasswordReset
  };
}