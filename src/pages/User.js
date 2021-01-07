import { Table, Tag, Space, Pagination } from 'antd';
import {Row, Col} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export function User() {
    const [users, setUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const token = localStorage.getItem('token')
    useEffect(() => {
        axios.get(
        'http://localhost:4000/api/user', { headers: {"Authorization" : `Bearer ${token}`} }
    ).then(res => {
        setUsers(res.data.users);
    }).catch(error => {
        console.log('error', error)
    })
  }, []);

    const onChangePage = value => {
        setCurrent(value)
    }

    return (
        <Row className="justify-content-md-center">
          <Col md={{ span: 12}}>
            <Table 
                columns={columns} 
                dataSource={users} 
                rowKey={record => record._id} 
                pagination={{defaultCurrent: current, total: users.length, onChange: onChangePage, pageSize: 2}}
            />
          </Col>
        </Row>
    )
}