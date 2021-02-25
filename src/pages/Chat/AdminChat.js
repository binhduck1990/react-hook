import {List, Avatar, Space} from 'antd'
import {Launcher} from 'react-chat-window'
import {Link} from 'react-router-dom'
import {MessageOutlined} from '@ant-design/icons'
import {useState, useEffect} from 'react'
import {useAuth} from '../../components/Auth'
import {chat, createdChat} from '../../components/Chat'

export function AdminChat(props){
    const auth = useAuth()
    const {users} = props
    const [messageList, setMessageList] = useState([])
    const [senderId] = useState(JSON.parse(localStorage.getItem('user'))._id)
    const [receiverId, setReceiverId] = useState('')
    const receiver = users.filter(user => user._id === receiverId)[0]

    const onClickUserToChat = (user) => {
        if(receiverId !== user._id) setReceiverId(user._id)
    }

    useEffect(() => {
        auth.socket.on('chat', function(data){
            if(receiverId && data.sender === receiverId){
                let messageListCopy = [...messageList]
                if(data.message_type === 'file'){
                    messageListCopy.push({author: 'them', data: {url: `http://localhost:4000/images/${data.message}`, fileName: data.message}, type: data.message_type})
                }else{
                    messageListCopy.push({author: 'them', data: {[data.message_type]: data.message}, type: data.message_type})
                }
                setMessageList(messageListCopy)
            }else{
                setReceiverId(data.sender)
            }
        })
    }, [auth.socket, receiverId, messageList])

    useEffect(() => { 
        if(receiverId){
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
    }, [senderId, receiverId])
  
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
        setReceiverId('')
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
        <>
            <List
                itemLayout="vertical"
                dataSource={users.filter(user => user.role !== 'admin')}
                style={{padding: 20}}
                renderItem={user => (
                <List.Item
                    actions={[<Space onClick={() => {onClickUserToChat(user)}}><Link to={'/#'}><MessageOutlined/><span style={{paddingLeft: 10}}>Reply</span></Link></Space>]}
                >
                    <List.Item.Meta
                    avatar={<Avatar src={`http://localhost:4000/images/${user.avatar}`} />}
                    title={user.username}
                    description={user.email}
                    />
                </List.Item>
                )}
            />
            {receiverId &&
                <Launcher
                    agentProfile={{
                        teamName: `Reply to ${receiver.username}`,
                        imageUrl: `http://localhost:4000/images/${receiver.avatar}`
                    }}
                    messageList={messageList}
                    onMessageWasSent={onMessageWasSent}
                    handleClick={() => onClickChat()}
                    isOpen={Boolean(receiverId)}
                    onFilesSelected={onFilesSelected}
                    mute={true}
                />
            }
        </>
   ) 
}