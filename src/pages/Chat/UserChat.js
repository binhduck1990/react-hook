import {Launcher} from 'react-chat-window'
import {Descriptions, Image, Tabs, Tag} from 'antd'
import moment from 'moment'

export function UserChat(props){
    const {TabPane} = Tabs
    const {users, messageList, onMessageWasSent, onClickChat, isOpen} = props
    const admin = users.filter(user => user.role === 'admin')[0]
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