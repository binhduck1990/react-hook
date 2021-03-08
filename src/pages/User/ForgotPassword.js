import {Form, Input, Button, notification} from 'antd'
import {useAuth} from '../.././components/Auth'
import {MailOutlined} from '@ant-design/icons'
import {useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'

export function ForgotPassword() {
  const auth = useAuth()
  const history = useHistory()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(loading){
      const email = form.getFieldValue('email')
      auth.sendPasswordResetEmail(email, (res) => {
        setLoading(false)
        notification['success']({
            message: res.data.message
        })
      }, (error) => {
        setLoading(false)
          auth.handleError(error, history)
      })
    }
  }, [loading, auth, history, form])

  const handleSubmit = () => {
    setLoading(true)
  }

  return (
    <Form
      form={form}
      name='normal_login'
      className='login-form'
      onFinish={handleSubmit}
    >
      <Form.Item>
        <h2 className='text-center'>Forgot Password?</h2>
        <p className='text-center'>You can reset your password here.</p>
      </Form.Item>
      <Form.Item
        name='email'
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input prefix={<MailOutlined className='site-form-item-icon' />} placeholder='Email address' />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button' loading={loading}>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  )
}