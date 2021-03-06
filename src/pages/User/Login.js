import {Form, Input, Button, Checkbox, notification} from 'antd'
import {useAuth} from '../.././components/Auth'
import {Link, useHistory, useLocation} from 'react-router-dom'
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

  const handleSubmit = (values) => {
    let { from } = location.state || { from: { pathname: '/' } }
    auth.signin(values, (res) => {
      notification['success']({
        message: res.data.message
      })
      if(values.remember){
        localStorage.setItem('email', values.email)
      }else{
        localStorage.removeItem('email')
      }
      history.replace(from)
    }, (error) => {
      auth.handleError(error, history)
    })
  }

  return (
    <Form
      form={form}
      name='normal_login'
      className='login-form'
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name='email'
        rules={[{required: true, message: 'Please input your email!'}]}
      >
        <Input prefix={<UserOutlined className='site-form-item-icon'/>} placeholder='Email' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{required: true, message: 'Please input your Password!'}]}
      >
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon'/>}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className='login-form-forgot' to={'/forgot-password'}>
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Log in
        </Button>
        Or <Link to={'/signup'}>register now!</Link>
      </Form.Item>
    </Form>
  )
}