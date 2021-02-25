import {Launcher} from 'react-chat-window'
import {Descriptions, Image, Tabs, Tag} from 'antd'
import moment from 'moment'
import {chat, createdChat} from '../../components/Chat'
import {useState, useEffect} from 'react'
import { useAuth } from '../../components/Auth'

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
                messageListCopy.push({author: 'them', data: {[data.message_type]: data.message}, type: data.message_type})
                setMessageList(messageListCopy)
            }else{
                setIsOpen(true)
            }
        })
    }, [auth.socket, isOpen, messageList])

    useEffect(() => { 
        if(isOpen){
            chat(`?sender=${senderId}&receiver=${receiverId}`, (res) => {
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
    }, [isOpen, senderId, receiverId])

    const onMessageWasSent = (newMessage) => {
        if(senderId && receiverId){
            let messageListCopy = [...messageList]
            messageListCopy.push(newMessage)
            setMessageList(messageListCopy)
            if(newMessage.type === 'text'){
                console.log('duck', senderId, receiverId, newMessage.data.text)
                auth.socket.emit('chat', {sender: senderId, receiver: receiverId, message: newMessage.data.text, type: 'text'})
            }else if(newMessage.type === 'emoji'){
                auth.socket.emit('chat', {sender: senderId, receiver: receiverId, message: newMessage.data.emoji, type: 'emoji'})
            }else if(newMessage.type === 'file'){
                auth.socket.emit('chat', {sender: senderId, receiver: receiverId, message: newMessage.data.url, type: 'file', fileName: newMessage.fileName})
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
        createdChat(formData, (res) => {
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
                <Descriptions.Item label="adminname">{admin.username}</Descriptions.Item>
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
            Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Contact" key="3">
            Content of Tab Pane 3
            </TabPane>
        </Tabs>
    )
}