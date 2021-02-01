import { Result, Button } from 'antd'
import {SideBar} from '../components/Sidebar'

export function Index(){
    return (
        <SideBar>
            <Result
                status="success"
                title="Successfully Purchased Cloud Server ECS!"
                subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                extra={[
                <Button type="primary" key="console">
                    Go Console
                </Button>,
                <Button key="buy">Buy Again</Button>,
                ]}
            />
        </SideBar>
    )
}