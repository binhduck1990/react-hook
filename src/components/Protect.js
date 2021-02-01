import {Route, Redirect} from "react-router-dom"
import {useAuth} from './Auth'
  
export function PrivateRoute({ children, ...rest }) {
  const auth = useAuth()
  const token = localStorage.getItem('token')
  if(token){
    const userId = JSON.parse(localStorage.getItem('user'))._id
    auth.socket.emit('login', userId)
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
      token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
  }
    