import {
  useParams
} from "react-router-dom"
import {useAuth} from '../.././components/Auth'
import {Form, Button, Input} from 'antd'
import {LockOutlined} from '@ant-design/icons'

export function ResetPassword(){
    const auth = useAuth()
    const [form] = Form.useForm()
    const {token} = useParams('')
    // useEffect(password, () => { 
    //     auth.confirmPasswordReset(token, (res) => {

    //     })
    // }, [auth, token])

    const handleSubmit = () => {
        const password = form.getFieldValue('password')
        auth.confirmPasswordReset(token, password, (res) => {

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
            <h1 style={{fontSize: 24, fontWeight: 300, letterSpacing: -0.5, textAlign: 'center'}}>Change password for BinhDang</h1>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="password-confirm"
            rules={[{ required: true, message: 'Please input your confirm password!' }]}
          >
            <Input.Password 
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm password"
            />
          </Form.Item>
    
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      )
}