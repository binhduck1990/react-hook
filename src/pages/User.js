import { Table, Tag, Space, Pagination } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {SideBar} from '../components/Sidebar'
import {
  useHistory
} from "react-router-dom";

const columns = [
  {
    title: 'Name',
    dataIndex: 'username',
    key: 'username',
    render: text => <a>{text}</a>,
    width: '20%'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '20%'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: '20%'
  },
  {
    title: 'email',
    key: 'email',
    dataIndex: 'email',
    width: '20%'
  },
  {
    title: 'Action',
    key: 'action',
    width: '20%',
    render: (text) => (
      <Space size="middle">
        <a>Update</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export function User() {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(1);
    const token = localStorage.getItem('token')
    let history = useHistory();
    useEffect(() => {
        axios.get(
        'http://localhost:4000/api/user', { headers: {"Authorization" : `Bearer ${token}`} }
    ).then(res => {
        setUsers(res.data.users);
        setTotal(res.data.total)
    }).catch(error => {
      if(error.response.status == 401){
        history.replace('/login');
      }
    })
  }, []);

    const onChangePage = value => {
        setCurrent(value)
    }

    return (
        <SideBar>
          <Table 
            columns={columns} 
            dataSource={users} 
            rowKey={record => record._id} 
            pagination={{defaultCurrent: current, total: total, onChange: onChangePage, pageSize: 2}}
            />
        </SideBar>
    )
}