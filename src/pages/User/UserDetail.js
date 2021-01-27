import {Descriptions, Image, Tag} from 'antd'
import {SideBar} from '../../components/Sidebar'
import {useParams} from "react-router-dom"
import {useState, useEffect} from 'react'
import {useAuth} from '../.././components/Auth'
import moment from 'moment'

export function UserDetail(){
    const auth = useAuth()
    const [user, setUser] = useState('')
    const [avatar, setAvatar] = useState('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png')
    const {id} = useParams('')
    useEffect(() => { 
        auth.detail(id, (res) => {
          setUser(res.data.user)
          if(res.data.user.avatar){
            setAvatar(`http://localhost:4000/images/${res.data.user.avatar}`)
          }
        })
    }, [auth, id])
    return (
        <SideBar>
            <Descriptions title="User Profile" column={1} style={{padding: 15}} bordered={true}>
            <Descriptions.Item label="Avatar">
                <Image
                    width={200}
                    src={avatar}
                />
            </Descriptions.Item>
            <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
            <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
            <Descriptions.Item label="Adress">{user.address}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Age">{user.age}</Descriptions.Item>
            <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
            <Descriptions.Item label="Birthday">{moment(user.birthday).format('DD-MM-YYYY')}</Descriptions.Item>
            <Descriptions.Item label="Hobbies">
                {user.hobbies && user.hobbies.map(tag => {
                    return (
                        <Tag color={'geekblue'} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    )
                })}
            </Descriptions.Item>
            </Descriptions>
        </SideBar>
    )
}