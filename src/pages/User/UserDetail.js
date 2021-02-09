import {Descriptions, Image, Tag} from 'antd'
import {SideBar} from '../../components/Sidebar'
import {useParams} from "react-router-dom"
import {useState, useEffect} from 'react'
import {useAuth} from '../.././components/Auth'
import moment from 'moment'
import {Launcher} from 'react-chat-window'

export function UserDetail(){
    const auth = useAuth()
    const [user, setUser] = useState('')
    const [messageList, setMessageList] = useState([])
    const [senderId, setSenderId] = useState('')
    const [receiverId, setReceiverId] = useState('')
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

    useEffect(() => {
        auth.socket.on('chat', function(data){
            setSenderId(data.receiver)
            setReceiverId(data.sender)
            let messageListCopy = [...messageList]
            let newMessage = data.message
            messageListCopy.push({author: 'them', data: {text: newMessage}, type: 'text' })
            setMessageList(messageListCopy)
        })
    }, [auth.socket])

    const onMessageWasSent = (newMessage) => {
        let messageListCopy = [...messageList]
        messageListCopy.push(newMessage)
        setMessageList(messageListCopy)
        const sender = senderId ? senderId : JSON.parse(localStorage.getItem('user'))._id
        const receiver = receiverId ? receiverId : user._id
        auth.socket.emit('chat', {sender: sender, receiver: receiver, message: newMessage.data.text})
    }

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
            <Launcher
                agentProfile={{
                    teamName: 'Chat to Binh',
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                messageList={messageList}
                onMessageWasSent={onMessageWasSent}
            />
        </SideBar>
    )
}