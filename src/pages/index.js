
import {SideBar} from '.././components/Sidebar'
import {useState, useEffect} from 'react'
import {useAuth} from '.././components/Auth'
import {chat} from '.././components/Chat'
import {UserChat} from './Chat/UserChat'
import {AdminChat} from './Chat/AdminChat'
import '../index.css'

export function Index(){
    const auth = useAuth()
    const [users, setUsers] = useState([])
    const [userLogin] = useState(JSON.parse(localStorage.getItem('user')))
    const [messageList, setMessageList] = useState([])
    const [senderId, setSenderId] = useState(JSON.parse(localStorage.getItem('user'))._id)
    const [receiverId, setReceiverId] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => { 
        auth.index('', (res) => {
            setUsers(res.data.users)   
            setIsLoading(true)   
        })
    }, [auth])

    useEffect(() => {
        auth.socket.on('chat', function(data){
            setSenderId(data.receiver)
            setReceiverId(data.sender)
            let messageListCopy = [...messageList]
            messageListCopy.push({author: 'them', data: {[data.message_type]: data.message}, type: data.message_type})
            setMessageList(messageListCopy)
            if(!isOpen){
                setIsOpen(!isOpen)
            }
        })
    }, [auth.socket, messageList, isOpen])

    useEffect(() => { 
        if(isOpen || receiverId){
            chat(`?sender=${senderId}&receiver=${receiverId}`, (res) => {
                const chats = []
                for(let i = 0; i < res.data.chats.length; i++){
                    if(res.data.chats[i].sender === senderId){
                        chats.push({author: 'me', data: {[res.data.chats[i].message_type]: res.data.chats[i].message}, type: res.data.chats[i].message_type})
                    }else{
                        chats.push({author: 'them', data: {[res.data.chats[i].message_type]: res.data.chats[i].message}, type: res.data.chats[i].message_type})
                    }
                }
                setMessageList(chats)
            })
        }
    }, [isOpen, receiverId])
    console.log('messageList', messageList)
    const onMessageWasSent = (newMessage) => {
        if(senderId && receiverId){
            let messageListCopy = [...messageList]
            messageListCopy.push(newMessage)
            setMessageList(messageListCopy)
            if(newMessage.type === 'text'){
                auth.socket.emit('chat', {sender: senderId, receiver: receiverId, message: newMessage.data.text, type: 'text'})
            }else if(newMessage.type === 'emoji'){
                auth.socket.emit('chat', {sender: senderId, receiver: receiverId, message: newMessage.data.emoji, type: 'emoji'})
            }
        }
    }

    const onClickChat = (user) => {
        setIsOpen(!isOpen)
        setReceiverId(user._id)
    }

    const onClickUserToChat = (user) => {
        if(!isOpen) setIsOpen(true)
        if(receiverId !== user._id) setReceiverId(user._id)
    }

    return (
        <SideBar>
            {userLogin.role !== 'admin' && isLoading &&
                <UserChat 
                    users={users}
                    onMessageWasSent={onMessageWasSent}
                    onClickChat={onClickChat}
                    messageList={messageList}
                    isOpen={isOpen}
                ></UserChat>
            }
            {userLogin.role === 'admin' && isLoading &&
                <AdminChat
                    isOpen={isOpen}
                    users={users}
                    onMessageWasSent={onMessageWasSent}
                    messageList={messageList}
                    onClickChat={onClickChat}
                    onClickUserToChat={onClickUserToChat}
                    receiverId={receiverId}
                >
                </AdminChat>
            }
        </SideBar>
    )
}