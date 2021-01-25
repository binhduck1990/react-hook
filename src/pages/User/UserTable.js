import {Table, Space, Popconfirm, Tooltip} from 'antd'
import {Link, useHistory} from 'react-router-dom'
import moment from 'moment'
import {useState, useEffect} from 'react'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

export function UserTable(props){
  const history = useHistory()
  const [sortCreatedAt, setSortCreatedAt] = useState(false)
  const [sortAge, setSortAge] = useState(false)
  const {users, page, pageSize, total, loading, param, removeUser} = props
  const query = new URLSearchParams(param)
  console.log('query', query.getAll('sort_by'))
  // set value for filter if url has query param
  useEffect(() => {
    // create a new instance of URLSearchParams to ignore useEffrect warning
    const query = new URLSearchParams(param) 
    if(query.has('sort_field') && query.has('sort_by')){
      const sortBy = query.get('sort_by') === 'desc' ? 'descend' : query.get('sort_by') === 'asc' ? 'ascend' : false
      if(query.get('sort_field') === 'createdAt'){
        setSortCreatedAt(sortBy)
      }
      if(query.get('sort_field') === 'age'){
        setSortAge(sortBy)
      }
    }else{
      setSortCreatedAt(false)
      setSortAge(false)
    }
  }, [param])

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <Link to={`user/profile/${record._id}`}>
          <Tooltip placement="topLeft" title="View Profile">
            {text}
          </Tooltip>  
        </Link>
      ),
      width: '20%'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '10%',
      sorter: true,
      sortOrder: sortAge,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '20%'
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
      sorter: true,
      sortOrder: sortCreatedAt,
      render: text => <>{moment(text, 'YYYY-MM-DD').format('DD-MM-YYYY')}</>
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`user/${record._id}`}>
            <Tooltip placement="topLeft" title="Edit Profile">
              <EditOutlined />
            </Tooltip>
            </Link>
          <Popconfirm title="Sure to delete?" onConfirm={(id) => removeUser(record._id)}>
            <Link to={'#'}>
              <Tooltip placement="topLeft" title="Remove User">
                <DeleteOutlined />
              </Tooltip>
              </Link>
          </Popconfirm>
        </Space>
      )
    }
  ]

  // push query params to url and set state of parent's params
  const pushQueryStringToUrl = (query) => {
    const result = "?" + query.toString()
    history.push({
        pathname: '/user',
        search: result
    })
    props.onFilterUser(result)
  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('sorter', sorter)
    // if(sortOrder !== sorter.order){
    //   if(sorter.order === undefined){
    //     setSortAge(false)
    //     setSortCreatedAt(false)
    //     query.delete('sort_field')
    //     query.delete('sort_by')
    //   }else{
    //     setSortOrder(sorter.order)
    //     query.set('sort_field', sorter.columnKey)
    //     if(sorter.order === 'descend'){
    //       query.set('sort_by', 'desc')
    //     }
    //     if(sorter.order === 'ascend'){
    //       query.set('sort_by', 'asc')
    //     }
    //   }
    // }

    if(pagination.current !== page || pagination.pageSize !== pageSize){
      query.set('page', pagination.current)
      query.set('page_size', pagination.pageSize)
    }
    pushQueryStringToUrl(query)
  }
  
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