import { Table, Space, Modal } from 'antd';
import { useState, useEffect } from 'react';
import {SideBar} from '../components/Sidebar'
import {UserFilter} from '../filters/UserFilter'
import {
  useHistory
} from "react-router-dom";
import '../index.css'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useAuth } from "../Auth"

export function User() {
  const history = useHistory();
  const auth = useAuth()
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10)
  const [id, setId] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [param, setParam] = useState(window.location.search)

  const listenToPopstate = () => {
    // when browser back or next, run this function to set query url
    setParam(window.location.search)
  };
  
  useEffect(() => {
    window.addEventListener('popstate', listenToPopstate)
    return () => window.removeEventListener('popstate', listenToPopstate)
  }, [])
  
  useEffect(() => {
    auth.paginate(param, (res) => {
      setUsers(res.data.users);
      setTotal(res.data.total);
      setPage(res.data.page)
      setPageSize(res.data.page_size)
    })
}, [param, auth]);

  const onChangePage = (page, pageSize) => {
    const query = new URLSearchParams(param)
    query.set('page', page)
    query.set('page_size', pageSize)
    pushQueryStringToUrl(query)
  }

  // push query params to url if page, per_page change
  const pushQueryStringToUrl = (query) => {
    const result = "?" + query.toString()
    history.push({
        pathname: '/user',
        search: result
    })
    setParam(result)
  }

  const onFilterUser = value => {
    setParam(value)
  }

  var showModal = (id) => {
    setId(id)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    auth.remove(id, auth.paginate('', (res) => {
      setUsers(res.data.users);
      setTotal(res.data.total);
      setPage(res.data.page)
      setPageSize(res.data.page_size)
    }))
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
      render: text => <Link to="/#">{text}</Link>,
      width: '20%'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '10%'
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
      key: 'createdAt',
      dataIndex: 'createdAt',
      width: '15%',
      render: text => <p>{moment(text, 'YYYY-MM-DD').format('DD-MM-YYYY')}</p>
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (text, record) => (
        <Space size="middle">
          <Link to="/user">Update</Link>
          <Link to="/user" onClick={() => showModal(record._id)}>Delete</Link>
        </Space>
      ),
    },
  ];

  return (
    <SideBar>
      <UserFilter onFilterUser={onFilterUser} param={param}></UserFilter>
      <Table
        style={{paddingLeft: 10, paddingRight: 10}}
        columns={columns} 
        dataSource={users} 
        rowKey={record => record._id} 
        pagination={{current: page, pageSize: pageSize, total: total, showSizeChanger: true, onChange: onChangePage}}
      />
      <Modal title="Delete user" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure you want to delete ?</p>
      </Modal>
    </SideBar>
  )
}