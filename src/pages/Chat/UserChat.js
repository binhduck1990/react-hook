import {Launcher} from 'react-chat-window'
import {Descriptions, Image, Tabs, Tag, List} from 'antd'
import moment from 'moment'
import {useState, useEffect} from 'react'
import {useAuth} from '../../components/Auth'
import {Link} from 'react-router-dom'

const backend = [
    'Api: Create, update, delete, detail, pagination base on MVC model',
    'Database mongodb: Use mongoose to save user and chat message',
    'Authentication: JWT register, login, logout, refresh token, reset password by email',
    'Redis: Save black list token when user logout',
    'Validator: Use Express-validator to validate data',
    'Upload image: Use Multer to upload avatar for user when create, update profile and send image through chat',
    'Permission: Check permision by role, default is user, Binh is admin',
    'SocketIO: Realtime online status when user login, realtime chat messege bettwen user and admin'
]

const frontend = [
    'React: Use react Hook to write function component with useState, useEffect, useMemo, UseAuth',
    'Library: Use antdesign for my project: component, icon, handle form data',
    'Api: Use axios to get data from server',
    'Users: Create, update, delete, detail, pagination users show online status, sorter, filter base on url: refresh page, back and next browser',
    'Chat: User after register can only chat with admin is Binh, Binh can reply to everyone'
]

export function UserChat(props){
    const {TabPane} = Tabs
    const {users} = props
    const auth = useAuth()
    const admin = users.filter(user => user.role === 'admin')[0]
    const [messageList, setMessageList] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [senderId] = useState(JSON.parse(localStorage.getItem('user'))._id)
    const [receiverId] = useState(admin._id)

    useEffect(() => {
        auth.socket.on('chat', function(data){
            if(isOpen){
                let messageListCopy = [...messageList]
                if(data.message_type === 'file'){
                    messageListCopy.push({author: 'them', data: {url: `http://localhost:4000/images/${data.message}`, fileName: data.message}, type: data.message_type})
                }else{
                    messageListCopy.push({author: 'them', data: {[data.message_type]: data.message}, type: data.message_type})
                }
                setMessageList(messageListCopy)
            }else{
                setIsOpen(true)
            }
        })
    }, [auth.socket, isOpen, messageList])

    useEffect(() => { 
        if(isOpen){
            auth.chat(`?sender=${senderId}&receiver=${receiverId}`, (res) => {
                const chats = []
                for(let i = 0; i < res.data.chats.length; i++){
                    if(res.data.chats[i].message_type === 'file'){
                        if(res.data.chats[i].sender === senderId){
                            chats.push({author: 'me', data: {url: `http://localhost:4000/images/${res.data.chats[i].message}`, fileName: res.data.chats[i].message}, type: res.data.chats[i].message_type}) 
                        }else{
                            chats.push({author: 'them', data: {url: `http://localhost:4000/images/${res.data.chats[i].message}`, fileName: res.data.chats[i].message}, type: res.data.chats[i].message_type})
                        }   
                    }else{
                        if(res.data.chats[i].sender === senderId){
                            chats.push({author: 'me', data: {[res.data.chats[i].message_type]: res.data.chats[i].message}, type: res.data.chats[i].message_type})
                        }else{
                            chats.push({author: 'them', data: {[res.data.chats[i].message_type]: res.data.chats[i].message}, type: res.data.chats[i].message_type})
                        }
                    }
                }
                setMessageList(chats)
            })
        }
    }, [auth, isOpen, senderId, receiverId])

    const onMessageWasSent = (newMessage) => {
        if(senderId && receiverId){
            let messageListCopy = [...messageList]
            messageListCopy.push(newMessage)
            setMessageList(messageListCopy)
            if(newMessage.type === 'text'){
                auth.socket.emit('chat', {sender: senderId, receiver: receiverId, message: newMessage.data.text, type: 'text'})
            }else if(newMessage.type === 'emoji'){
                auth.socket.emit('chat', {sender: senderId, receiver: receiverId, message: newMessage.data.emoji, type: 'emoji'})
            }else if(newMessage.type === 'file'){
                auth.socket.emit('chat', {sender: senderId, receiver: receiverId, message: newMessage.data.fileName, type: 'file'})
            }
        }
    }

    const onClickChat = () => {
        setIsOpen(!isOpen)
    }

    const onFilesSelected = (file) => {
        const formData = new FormData()
        formData.append('avatar', file[0])
        formData.append('sender', senderId)
        formData.append('receiver', receiverId)
        formData.append('type', 'file')
        auth.createdChat(formData, (res) => {
            onMessageWasSent({author: 'me', type : 'file', data : {url: `http://localhost:4000/images/${res.data.chat.message}`, fileName: res.data.chat.message}})
        })
    }

    return (
        <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Profile" key="1">
                <Descriptions title="Personality" column={1} style={{padding: 15}} bordered={true}>
                <Descriptions.Item label="Avatar">
                    <Image
                        width={200}
                        src={`http://localhost:4000/images/${admin.avatar}`}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="Username">{admin.username}</Descriptions.Item>
                <Descriptions.Item label="Phone">{admin.phone}</Descriptions.Item>
                <Descriptions.Item label="Adress">{admin.address}</Descriptions.Item>
                <Descriptions.Item label="Email">{admin.email}</Descriptions.Item>
                <Descriptions.Item label="Age">{admin.age}</Descriptions.Item>
                <Descriptions.Item label="Gender">{admin.gender}</Descriptions.Item>
                <Descriptions.Item label="Birthday">{moment(admin.birthday).format('DD-MM-YYYY')}</Descriptions.Item>
                <Descriptions.Item label="Hobbies">
                    {admin.hobbies && admin.hobbies.map(tag => {
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
                        teamName: `Chat to ${admin.username}`,
                        imageUrl: `http://localhost:4000/images/${admin.avatar}`
                    }}
                    messageList={messageList}
                    onMessageWasSent={onMessageWasSent}
                    handleClick={() => onClickChat(admin)}
                    isOpen={isOpen}
                    onFilesSelected={onFilesSelected}
                    mute={true}
                />
            </TabPane>
            <TabPane tab="Describe Project" key="2">
                <List
                    size="large"
                    header={<Link to={'#'}>Backend - Nodejs Express</Link>}
                    bordered
                    dataSource={backend}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
                <List
                    style={{marginTop: 15}}
                    size="large"
                    header={<Link to={'#'}>Frontend - Reactjs</Link>}
                    bordered
                    dataSource={frontend}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            </TabPane>
        </Tabs>
    )
}