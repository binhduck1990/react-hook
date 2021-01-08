import React, { useState } from "react";
import { Form, Input, Button } from 'antd';
import { useAuth } from "../Auth"
import {
    useHistory,
    useLocation
  } from "react-router-dom";
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export function CreatedUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth()
    let history = useHistory();
    let location = useLocation();
  
    const handleSubmit = () => {
        let { from } = location.state || { from: { pathname: "/" } };
        auth.signin(email, password, () => {
            history.replace(from);
        })
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

    const onChangeUsername = (e) => {
        setPassword(e.target.value)
    }

    const onChangeAge = (e) => {
        setPassword(e.target.value)
    }

    const onChangeAddress = (e) => {
        setPassword(e.target.value)
    }

    return (
    <Layout>
        <Content>
            <Form
                {...layout}
                name="basic"
                onFinish={handleSubmit}
                >
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
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input 
                        onChange={onChangeUsername}
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
            
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
                </Form>
        </Content> 
    </Layout>    
      );
    };