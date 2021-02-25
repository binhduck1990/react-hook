
import {SideBar} from '.././components/Sidebar'
import {useState, useEffect} from 'react'
import {UserChat} from './Chat/UserChat'
import {AdminChat} from './Chat/AdminChat'
import {useAuth} from '../components/Auth'
import '../index.css'

export function Index(){
    const [users, setUsers] = useState([])
    const [userLogin] = useState(JSON.parse(localStorage.getItem('user')))
    const [isLoading, setIsLoading] = useState(false)
    const auth = useAuth()
    useEffect(() => { 
        auth.index('', (res) => {
            setUsers(res.data.users)   
            setIsLoading(true)   
        })
    }, [auth])

    return (
        <SideBar>
            {userLogin.role !== 'admin' && isLoading &&
                <UserChat 
                    users={users}
                ></UserChat>
            }
            {userLogin.role === 'admin' && isLoading &&
                <AdminChat
                    users={users}
                >
                </AdminChat>
            }
        </SideBar>
    )
}