import { Form, Input, Button, Checkbox } from 'antd';
import { useAuth } from "../Auth"
import {
  Link,
    useHistory,
    useLocation
  } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export function Login() {
  const auth = useAuth()
  let history = useHistory();
  let location = useLocation();

  const handleSubmit = () => {
    let { from } = location.state || { from: { pathname: "/user" } };
    // auth.signin({email, password}, (res) => {
    //     history.replace(from);
    // })
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to={'/user/signup'}>register now!</Link>
      </Form.Item>
    </Form>
  )
}