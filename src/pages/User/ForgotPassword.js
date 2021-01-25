import {Form, Input, Button} from 'antd'
import {useAuth} from "../../Auth"
import { MailOutlined } from '@ant-design/icons'

export function ForgotPassword() {
  const auth = useAuth()
  const [form] = Form.useForm()

  const handleSubmit = () => {
    const email = form.getFieldValue('email')
    auth.sendPasswordResetEmail(email, (res) => {
      
    })
  }

  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      onFinish={handleSubmit}
    >
      <Form.Item>
        <h2 className="text-center">Forgot Password?</h2>
        <p className="text-center">You can reset your password here.</p>
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email address" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  )
}