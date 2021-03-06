import {Table, Space, Popconfirm, Tooltip, Avatar, Image} from 'antd'
import {Link, useHistory} from 'react-router-dom'
import moment from 'moment'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import {useEffect, useState} from 'react'
import {useAuth} from '../.././components/Auth'

export function UserTable(props){
  const history = useHistory()
  const auth = useAuth()
  const apiDomain = process.env.REACT_APP_API
  const [status, setStatus] = useState([])
  const {users, page, pageSize, total, loading, param, removeUser, onFilterUser} = props
  const query = new URLSearchParams(param)

  // push query params to url and set state of parent's params
  const pushQueryStringToUrl = (query) => {
    const result = '?' + query.toString()
    history.push({
        pathname: '/user',
        search: result
    })
    onFilterUser(result)
  }

  const onChange = (pagination) => {
    if(pagination.current !== page || pagination.pageSize !== pageSize){
      query.set('page', pagination.current)
      query.set('page_size', pagination.pageSize)
      pushQueryStringToUrl(query)
    }
  }

  useEffect(() => {
    auth.socket.on('online', function(data){
      setStatus(data)
    })
    auth.socket.on('offline', function(data){
      setStatus(data)
    }) 
  }, [auth.socket])

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      responsive: ['lg'],
      render: (text, record) => (
        <Avatar src={<Image src={`${apiDomain}/images/${record.avatar}`}/>}/>
      ),
      width: '5%'
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: (text, record) => (
        <>
          <Space>
            {status.includes(record._id) ? 
              <Tooltip placement='topRight' title='Online'>
                <div style={{width: 7, height: 7, background: '#87d068', borderRadius: '50%'}}></div>
              </Tooltip>
                  :
              <Tooltip placement='topRight' title='Offline'>
                <div style={{width: 7, height: 7, background: '#f50', borderRadius: '50%'}}></div>
              </Tooltip>
            }
            <Link to={`user/profile/${record._id}`}>
              <Tooltip placement='topRight' title='View Profile'>
                {text}
              </Tooltip>  
            </Link>
          </Space>
        </>
      ),
      width: '20%'
    },
    {
      title: 'Message',
      dataIndex: 'massage',
      key: 'massage',
      responsive: ['lg'],
      width: '10%',
      render: (text, record) => (
        <Link to={'#'}>
          <Tooltip placement='topRight' title='Total message has sent'>
            <span>{record.messages.length}</span>
          </Tooltip>  
        </Link>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      responsive: ['lg'],
      width: '20%'
    },
    {
      title: 'Email',
      key: 'email',
      responsive: ['lg'],
      dataIndex: 'email',
      width: '15%'
    },
    {
      title: 'Phone',
      key: 'phone',
      responsive: ['lg'],
      dataIndex: 'phone',
      width: '10%'
    },
    {
      title: 'Created At',
      key: 'created_at',
      responsive: ['lg'],
      dataIndex: 'createdAt',
      width: '15%',
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      render: text => <>{moment(text, 'YYYY-MM-DD').format('DD-MM-YYYY')}</>
    },
    {
      title: 'Action',
      key: 'action',
      width: '5%',
      render: (text, record) => (
        <Space size='middle'>
          <Link to={`user/${record._id}`}>
            <Tooltip placement='topRight' title='Edit Profile'>
              <EditOutlined />
            </Tooltip>
          </Link>
          <Popconfirm title='Sure to delete?' onConfirm={(id) => removeUser(record._id)}>
            <Link to={'#'}>
              <Tooltip placement='topRight' title='Remove User'>
                <DeleteOutlined />
              </Tooltip>
              </Link>
          </Popconfirm>
        </Space>
      )
    }
  ]
  
  return (
    <Table
        loading={loading}
        style={{paddingLeft: 10, paddingRight: 10}}
        columns={columns} 
        dataSource={users} 
        rowKey={record => record._id}
        onChange={onChange}
        pagination={{current: page, pageSize: pageSize, total: total, showSizeChanger: true}}
    />
  )
}