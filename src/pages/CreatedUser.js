import React, { useState } from "react";
import { Form, Input, Button, notification, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import { useAuth } from "../Auth"
import {
    useHistory,
    useLocation
} from "react-router-dom";

export function CreatedUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [fileList, setFileList] = useState([]);
    const auth = useAuth()
    let history = useHistory();
    let location = useLocation();
    const [form] = Form.useForm();
  
    const handleSubmit = () => {
        let { from } = location.state || { from: { pathname: "/user" } };
        const formData = new FormData()
        if(email) formData.append('email', email)
        if(password) formData.append('password', password)
        if(age) formData.append('age', age)
        if(phone) formData.append('phone', phone)
        if(address) formData.append('address', address)
        if(username) formData.append('username', username)
        if(fileList) formData.append('avatar', fileList[0])
        auth.signup(formData, () => {
            history.replace(from)
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
        if(type ==='password') setPassword(e.target.value)
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
    <>
        <h1 style={{textAlign: 'center', margin: '50px 0px 20px 0px'}}>Create your account</h1>
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
                    { min: 8} 
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
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password 
                    onChange={(e) => {onChangeInput(e, 'password')}}
                />
            </Form.Item>

            <Form.Item
                label="Age"
                name="age"
            >
                <Input 
                    onChange={(e) => {onChangeInput(e, 'age')}}
                />
            </Form.Item>

            <Form.Item
                label="Address"
                name="address"
            >
                <Input 
                    onChange={(e) => {onChangeInput(e, 'address')}}
                />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phone"
            >
                <Input 
                    onChange={(e) => {onChangeInput(e, 'phone')}}
                />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{marginRight: 10}}>
                    Create
                </Button>
                <Button type="danger" htmlType="button" onClick={onReset}>
                    Clear
                </Button>
            </Form.Item>
        </Form>
    </>
    );
};