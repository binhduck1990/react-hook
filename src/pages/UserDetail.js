import { Descriptions, Image } from 'antd';
import { SideBar } from '../components/Sidebar'

export function UserDetail(){
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <SideBar>
            <Descriptions title="User Profile" column={1} style={{padding: 15}} bordered={true}>
            <Descriptions.Item label="Avatar">
                <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
            </Descriptions.Item>
            <Descriptions.Item label="UserName">{user.username}</Descriptions.Item>
            <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
            <Descriptions.Item label="Adress">{user.address}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Age">{user.age}</Descriptions.Item>
            </Descriptions>
        </SideBar>
    )
}