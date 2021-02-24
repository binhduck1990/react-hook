import {List, Avatar, Space} from 'antd'
import {Launcher} from 'react-chat-window'
import {Link} from 'react-router-dom'
import {MessageOutlined} from '@ant-design/icons'

export function AdminChat(props){
    const {users, messageList, onMessageWasSent, onClickUserToChat, onClickChat, receiverId, isOpen} = props
    const receiver = users.filter(user => user._id === receiverId)[0]
    const onFilesSelected = (file) => {
        console.log('file', file)
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
            {isOpen && 
                <Launcher
                    agentProfile={{
                        teamName: `Reply to ${receiver.username}`,
                        imageUrl: `http://localhost:4000/images/${receiver.avatar}`
                    }}
                    messageList={messageList}
                    onMessageWasSent={onMessageWasSent}
                    handleClick={() => onClickChat(receiver)}
                    isOpen={isOpen}
                    onFilesSelected={onFilesSelected}
                />
            }
        </>
   ) 
}