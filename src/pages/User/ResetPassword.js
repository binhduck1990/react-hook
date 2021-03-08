import {useParams} from 'react-router-dom'
import {useAuth} from '../.././components/Auth'
import {Form, Button, Input, notification} from 'antd'
import {LockOutlined} from '@ant-design/icons'
import {useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'
import jwt_decode from 'jwt-decode'

export function ResetPassword(){
  const auth = useAuth()
  const history = useHistory()
  const [form] = Form.useForm()
  const {token} = useParams('')
  const [loading, setLoading] = useState(false)

  try {
    var decodeToken = jwt_decode(token)
  } catch (error) {
    history.replace('/404')
  }

  useEffect(() => {
    if(loading){
      const password = form.getFieldValue('password')
      auth.confirmPasswordReset(token, password, (res) => {
        setLoading(false)
        notification['success']({
            message: res.data.message
        })
      }, (error) => {
        setLoading(false)
        auth.handleError(error, history)
      })
    }
  }, [loading, auth, history, form, token])

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
        <h1 style={{fontSize: 24, fontWeight: 300, letterSpacing: -0.5, textAlign: 'center'}}>Change password for {decodeToken ? decodeToken.username : ''}</h1>
      </Form.Item>

      <Form.Item
        name='password'
        rules={[{required: true, message: 'Please input your password!'}]}
      >
        <Input.Password 
          prefix={<LockOutlined className='site-form-item-icon'/>}
          type='password'
          placeholder='Password'
        />
      </Form.Item>

      <Form.Item
        name='password-confirm'
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password 
          prefix={<LockOutlined className='site-form-item-icon'/>}
          type='password'
          placeholder='Confirm password'
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button' loading={loading}>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  )
}