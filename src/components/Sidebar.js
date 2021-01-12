import { Layout, Menu, Avatar, Dropdown } from 'antd';
import React, { useState } from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DownOutlined
} from '@ant-design/icons';
import '../css/Sidebar.css'
import { Link } from 'react-router-dom'

const { Header, Sider, Content } = Layout;
const menu = (
    <Menu
        style={{ width: 200 }}
        theme={'light'}
        mode={'inline'}
    >
      <Menu.Item key="0">
        <p>Dang Quang Binh</p>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="http://localhost:3000/user/detail">Detail Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Log out</Menu.Item>
    </Menu>
  )

export function SideBar({children}){
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed)
    }
    return (
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                User
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                {collapsed ? <MenuUnfoldOutlined className="trigger" onClick={toggle}/> : <MenuFoldOutlined className="trigger" onClick={toggle}/>}
                <Dropdown className='dropdown-header' overlay={menu} trigger={['click']} placement='topLeft'>
                    <Link to="/#" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer'}} icon={<UserOutlined />} /> <DownOutlined />
                    </Link>
                </Dropdown>
            </Header>
            <Content
              className="site-layout-background"
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      );
}