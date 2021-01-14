import React, { useState } from "react";
import { Form, Input, Button } from 'antd';
import { useAuth } from "../Auth"
import {
    useHistory,
    useLocation
} from "react-router-dom";
import { message } from 'antd';

export function CreatedUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const auth = useAuth()
    let history = useHistory();
    let location = useLocation();
    const [form] = Form.useForm();
  
    const handleSubmit = () => {
        let { from } = location.state || { from: { pathname: "/user" } };
        const payload = {name, email, password, age, phone, address};
        auth.signup(payload)
        // history.replace(from);
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
      };

      const tailLayout = {
        wrapperCol: { offset: 8, span: 8 },
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeAge = (e) => {
        setAge(e.target.value)
    }

    const onChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const onReset = () => {
        form.resetFields();
    }

return (
    <>
        <h1 style={{textAlign: 'center', margin: '50px 0px 20px 0px'}}>Create your account</h1>
        <Form
            {...layout}
            name="basic"
            onFinish={handleSubmit}
            form={form}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input 
                    onChange={onChangeName}
                />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input 
                    onChange={onChangeEmail}
                />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password 
                    onChange={onChangePassword}
                />
            </Form.Item>

            <Form.Item
                label="Age"
                name="age"
            >
                <Input 
                    onChange={onChangeAge}
                />
            </Form.Item>

            <Form.Item
                label="Address"
                name="address"
            >
                <Input 
                    onChange={onChangeAddress}
                />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phone"
            >
                <Input 
                    onChange={onChangePhone}
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