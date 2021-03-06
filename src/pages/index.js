
import {SideBar} from '.././components/Sidebar'
import {useState, useEffect} from 'react'
import {UserChat} from './Chat/UserChat'
import {AdminChat} from './Chat/AdminChat'
import {useAuth} from '../components/Auth'
import {Spin} from 'antd'
import {useHistory} from 'react-router-dom'
import '../index.css'

export function Index(){
    const [users, setUsers] = useState([])
    const [userLogin] = useState(JSON.parse(localStorage.getItem('user')))
    const [isLoading, setIsLoading] = useState(false)
    const auth = useAuth()
    const history = useHistory()
    useEffect(() => { 
        auth.index('', (res) => {
            setUsers(res.data.users)   
            setIsLoading(true)   
        }, (error) => {
            auth.handleError(error, history)
        })
    }, [auth])

    return (
        <SideBar>
            {userLogin.role !== 'admin' && isLoading &&
                <UserChat 
                    users={users}
                >
                </UserChat>
            }
            {userLogin.role === 'admin' && isLoading &&
                <AdminChat
                    users={users}
                >
                </AdminChat>
            }
            {!isLoading && 
                <div className="spin">
                    <Spin />
                </div>
            }
        </SideBar>
    )
}