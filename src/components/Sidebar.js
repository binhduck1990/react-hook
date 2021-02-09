import '../css/Sidebar.css'
import {Layout, Menu, Avatar, Dropdown} from 'antd'
import {MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, DownOutlined, MessageOutlined} from '@ant-design/icons'
import {Link, useHistory} from 'react-router-dom'
import {useAuth} from './Auth'
import {useState} from 'react'

const { Header, Sider, Content } = Layout

export function SideBar({children}){
  const auth = useAuth()
  const history = useHistory()
  const [collapsed, setCollapsed] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const avatar = `http://localhost:4000/images/${user.avatar}`

  const toggle = () => {
      setCollapsed(!collapsed)
  }

  const logout = () => {
    auth.signout(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      auth.socket.emit('logout', user._id, (confirmation) => {
        if(confirmation){
          history.replace('/login')
        }
      })
    })
  }

  const menu = (
    <Menu
      style={{ width: 200 }}
      theme={'light'}
    >
      <Menu.Item key="1">
        <Link to={`/user/profile/${user._id}`}>Detail Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={logout}>Log out</Menu.Item>
    </Menu>
  )

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to={`/user`}>User</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {collapsed ? <MenuUnfoldOutlined className="trigger" onClick={toggle}/> : <MenuFoldOutlined className="trigger" onClick={toggle}/>}
          <Dropdown className='dropdown-header' overlay={menu} trigger={['click']} placement='topLeft'>
            <Link to="/#" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <Avatar src={avatar} style={{ backgroundColor: '#87d068', cursor: 'pointer'}}/> <DownOutlined />
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
    )
}