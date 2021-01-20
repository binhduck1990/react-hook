import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import { useAuth } from "../Auth"
import {SideBar} from '../components/Sidebar'
import {
    useHistory,
    useLocation,
    useParams
} from "react-router-dom";

export function UpdatedUser() {
    const {id} = useParams();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('')
    const [fileList, setFileList] = useState([])
    const auth = useAuth()
    let history = useHistory();
    let location = useLocation();
    const [form] = Form.useForm();
    
    useEffect(() => { 
        auth.detail(id, (res) => {
          form.setFieldsValue({
            username: res.data.user.username,
            email: res.data.user.email,
            age: res.data.user.age,
            phone: res.data.user.phone,
            address: res.data.user.address
          })
          if(res.data.user.avatar){
            setFileList([{
                uid: '-1',
                name: res.data.user.avatar,
                status: 'done',
                url: `http://localhost:4000/images/${res.data.user.avatar}`
              }])
          }
        })
    }, [auth, id, form]);
  
    const handleSubmit = () => {
        console.log('fileList', fileList[0])
        let { from } = location.state || { from: { pathname: "/user" } };
        const formData = new FormData()
        if(email) formData.append('email', email)
        if(age) formData.append('age', age)
        if(phone) formData.append('phone', phone)
        if(address) formData.append('address', address)
        if(username) formData.append('username', username)
        if(fileList.length && fileList[0].uid !== '-1'){
            formData.append('avatar', fileList[0])
        }else{
            formData.append('avatar', '')
        }

        auth.update(id, formData, () => {
        }, (errors) => {
            
        })
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 8 },
    };

    const onChangeInput = (e, type) => {
        if(type === 'username') setUsername(e.target.value)
        if(type === 'email') setEmail(e.target.value)
        if(type === 'age') setAge(e.target.value)
        if(type === 'phone') setPhone(e.target.value)
        if(type === 'address') setAddress(e.target.value)
    }

    const onReset = () => {
        form.resetFields();
    }

    const props = {
        onRemove: () => {
            setFileList([])
        },
        beforeUpload(file){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                file.url = reader.result
                setFileList([file])
            };
            return false
        },
        fileList,
        listType: 'picture',
        maxCount: 1,
      }
return (
    <SideBar>
        <h1 style={{textAlign: 'center', margin: '15px 0px 20px 0px'}}>Update your account</h1>
        <Form
            {...layout}
            form={form}
            name="basic"
            onFinish={handleSubmit}
        >
            <Form.Item
                label="Avatar"
                name="avatar"
            >
                <Upload
                    {...props}
                >
                    <Button icon={<UploadOutlined />}>Upload avatar</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: 'Please input your name!' },
                ]}
            >
                <Input 
                    onChange={(e) => {onChangeInput(e, 'username')}}
                />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input 
                    onChange={(e) => {onChangeInput(e, 'email')}}
                />
            </Form.Item>

            <Form.Item
                label="Age"
                name="age"
                initialValue={age}
            >
                <Input 
                    onChange={(e) => {onChangeInput(e, 'age')}}
                />
            </Form.Item>

            <Form.Item
                label="Address"
                name="address"
                initialValue={address}
            >
                <Input 
                    onChange={(e) => {onChangeInput(e, 'address')}}
                />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phone"
                initialValue={phone}
            >
                <Input 
                    onChange={(e) => {onChangeInput(e, 'phone')}}
                />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{marginRight: 10}}>
                    Update
                </Button>
                <Button type="danger" htmlType="button" onClick={onReset}>
                    Clear
                </Button>
            </Form.Item>
        </Form>
    </SideBar>
    );
}