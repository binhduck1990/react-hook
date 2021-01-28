import {Table, Space, Popconfirm, Tooltip, Avatar, Image, Tag} from 'antd'
import {Link, useHistory} from 'react-router-dom'
import moment from 'moment'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import {io} from "socket.io-client"
import {useState, useEffect} from 'react'

export function UserTable(props){
  const history = useHistory()
  const [status, setStatus] = useState('offline')
  const {users, page, pageSize, total, loading, param, removeUser} = props
  const query = new URLSearchParams(param)

  // push query params to url and set state of parent's params
  const pushQueryStringToUrl = (query) => {
    const result = "?" + query.toString()
    history.push({
        pathname: '/user',
        search: result
    })
    props.onFilterUser(result)
  }

  const onChange = (pagination) => {
    if(pagination.current !== page || pagination.pageSize !== pageSize){
      query.set('page', pagination.current)
      query.set('page_size', pagination.pageSize)
      pushQueryStringToUrl(query)
    }
  }

  useEffect(() => {
    const socket = io("http://localhost:5000")
    socket.on("online", (socket) => {
      setStatus(socket)
    })
  }, [])

  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text, record) => (
        <Avatar src={<Image src={`http://localhost:4000/images/${record.avatar}`}/>}/>
      ),
      width: '5%'
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <Link to={`user/profile/${record._id}`}>
          <Tooltip placement="topRight" title="View Profile">
            {text}
          </Tooltip>  
        </Link>
      ),
      width: '15%'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '10%',
      sorter: (a, b) => a.age - b.age
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '15%'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: () => (
        <Tag color="green">{status}</Tag>
      ),
      width: '5%'
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      width: '15%'
    },
    {
      title: 'Phone',
      key: 'phone',
      dataIndex: 'phone',
      width: '10%'
    },
    {
      title: 'Created At',
      key: 'created_at',
      dataIndex: 'createdAt',
      width: '15%',
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      render: text => <>{moment(text, 'YYYY-MM-DD').format('DD-MM-YYYY')}</>
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`user/${record._id}`}>
            <Tooltip placement="topRight" title="Edit Profile">
              <EditOutlined />
            </Tooltip>
            </Link>
          <Popconfirm title="Sure to delete?" onConfirm={(id) => removeUser(record._id)}>
            <Link to={'#'}>
              <Tooltip placement="topRight" title="Remove User">
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