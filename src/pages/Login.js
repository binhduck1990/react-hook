import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { useAuth } from "../Auth"
import {
    useHistory,
    useLocation
  } from "react-router-dom";

export function Login() {
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

    const onChangePassword= (e) => {
        setPassword(e.target.value)
    }

    return (
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
    
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>   
      );
    };