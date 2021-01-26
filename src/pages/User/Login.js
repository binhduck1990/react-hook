import {Form, Input, Button, Checkbox} from 'antd'
import {useAuth} from '../.././components/Auth'
import {Link, useHistory, useLocation} from "react-router-dom"
import {UserOutlined, LockOutlined} from '@ant-design/icons'

export function Login() {
  const auth = useAuth()
  let history = useHistory()
  let location = useLocation()
  const [form] = Form.useForm()
  const email = localStorage.getItem('email')
  if(email){
    form.setFieldsValue({email})
  }

  const handleSubmit = () => {
    let { from } = location.state || { from: { pathname: "/user" } }
    const email = form.getFieldValue('email')
    const password = form.getFieldValue('password')
    const remember = form.getFieldValue('remember')
    auth.signin({email, password}, (res) => {
      if(remember){
        localStorage.setItem('email', email)
      }else{
        localStorage.removeItem('email')
      }
      history.replace(from)
    })
  }

  return (
    <Form
      form={form}
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
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" to={'/forgot-password'}>
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to={'/signup'}>register now!</Link>
      </Form.Item>
    </Form>
  )
}