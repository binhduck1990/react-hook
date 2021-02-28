import './User.css'
import {useState, useEffect} from 'react'
import {SideBar} from '../../components/Sidebar'
import {UserFilter} from './UserFilter'
import {UserTable} from './UserTable'
import {useAuth} from '../.././components/Auth'
import {useHistory} from "react-router-dom"

export function User() {
  const auth = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [param, setParam] = useState(window.location.search)

  const listenToPopstate = () => {
    // when browser back or next, run this function to set query url
    setParam(window.location.search)
  }
  
  useEffect(() => {
    window.addEventListener('popstate', listenToPopstate)
    return () => window.removeEventListener('popstate', listenToPopstate)
  }, [])
  
  useEffect(() => { 
    setLoading(true)
    auth.paginate(param, (res) => {
      setLoading(false)
      setUsers(res.data.users)
      setTotal(res.data.total)
      setPage(res.data.page)
      setPageSize(res.data.page_size)
    }, (error) => {
      auth.handleError(error, history)
    })
  }, [param, auth, history])

  const onFilterUser = value => {
    setParam(value)
  }

  const removeUser = (id) => {
    setLoading(true)
    auth.remove(id, (res_remove) => {
      auth.paginate(param, (res) => {
        setLoading(false)
        setUsers(res.data.users)
        setTotal(res.data.total)
        setPage(res.data.page)
        setPageSize(res.data.page_size)
      }, (error) => {
        auth.handleError(error, history)
      })
    })
  }

  return (
    <SideBar>
      <UserFilter onFilterUser={onFilterUser} param={param}/>
      <UserTable 
        loading={loading}
        users={users}
        total={total}
        page={page}
        pageSize={pageSize}
        param={param}
        removeUser={removeUser}
        onFilterUser={onFilterUser}
      >    
      </UserTable>
    </SideBar>
  )
}