import {Route, Redirect} from 'react-router-dom'
import {useAuth} from './Auth'
  
export function PrivateRoute({ children, ...rest }) {
  const auth = useAuth()
  const token = localStorage.getItem('token')
  if(token){
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id : ''
    if(userId){
      auth.socket.emit('login', userId)
    } 
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
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
  }
    