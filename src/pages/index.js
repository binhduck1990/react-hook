import {Descriptions, Image, Tag} from 'antd'
import {SideBar} from '.././components/Sidebar'
import {useState, useEffect} from 'react'
import {useAuth} from '.././components/Auth'
import moment from 'moment'
import {Launcher} from 'react-chat-window'
import '../index.css'

export function Index(){
    const auth = useAuth()
    const [user, setUser] = useState('')
    const [messageList, setMessageList] = useState([])
    const [senderId, setSenderId] = useState('')
    const [receiverId, setReceiverId] = useState('')
    const [avatar, setAvatar] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => { 
        auth.index('', (res) => {
        const user = res.data.users.filter(user => user.role === 'admin')[0]
          setUser(user)
          if(user.avatar){
            setAvatar(`http://localhost:4000/images/${user.avatar}`)
          }
        })
    }, [auth])

    useEffect(() => {
        auth.socket.on('chat', function(data){
            setSenderId(data.receiver)
            setReceiverId(data.sender)
            let messageListCopy = [...messageList]
            messageListCopy.push({author: 'them', data: {text: data.message}, type: 'text'})
            setMessageList(messageListCopy)
            if(!isOpen){
                setIsOpen(!isOpen)
            }
        })
    }, [auth.socket, messageList, isOpen])
    
    const onMessageWasSent = (newMessage) => {
        const sender = senderId ? senderId : JSON.parse(localStorage.getItem('user'))._id
        const receiver = receiverId ? receiverId : user._id
        if(sender !== receiver){
            let messageListCopy = [...messageList]
            messageListCopy.push(newMessage)
            setMessageList(messageListCopy)
            auth.socket.emit('chat', {sender: sender, receiver: receiver, message: newMessage.data.text})
        }
    }

    const onClickChat = () => {
        setIsOpen(!isOpen)
    }

    return (
        <SideBar>
            <Descriptions title="Binh's Profile" column={1} style={{padding: 15}} bordered={true}>
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
                    imageUrl: `http://localhost:4000/images/${user.avatar}`
                }}
                messageList={messageList}
                onMessageWasSent={onMessageWasSent}
                handleClick={onClickChat}
                isOpen={isOpen}
            />
        </SideBar>
    )
}