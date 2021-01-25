import {Form, Input, Button, Upload, Radio} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import {useAuth} from "../../Auth"
import {
    useHistory,
    useLocation
} from "react-router-dom"

export function CreatedUser() {
    const auth = useAuth()
    let history = useHistory()
    let location = useLocation()
    const [form] = Form.useForm()
  
    const handleSubmit = () => {
        let { from } = location.state || { from: { pathname: "/user" } }
        const formData = new FormData()
        const email = form.getFieldValue('email')
        const password = form.getFieldValue('password') 
        const age = form.getFieldValue('age') 
        const phone = form.getFieldValue('phone') 
        const address = form.getFieldValue('address') 
        const username = form.getFieldValue('username') 
        const gender = form.getFieldValue('gender') 
        const fileList = form.getFieldValue('fileList')

        if(email) formData.append('email', email)
        if(password) formData.append('password', password)
        if(age) formData.append('age', age)
        if(phone) formData.append('phone', phone)
        if(address) formData.append('address', address)
        if(username) formData.append('username', username)
        if(gender) formData.append('gender', gender)
        if(fileList) formData.append('avatar', fileList[0])

        auth.signup(formData, () => {
            history.replace(from)
        }, (errors) => {
            
        })
    }

    const onReset = () => {
        form.resetFields()
    }

    const props = {
        onRemove: () => {
            form.setFieldsValue({fileList: []})
        },
        beforeUpload(file){
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                file.url = reader.result
                form.setFieldsValue({fileList: [file]})
            }
            return false
        },
        listType: 'picture',
        maxCount: 1,
      }

    const onChangeGender = (e) => {
        form.setFieldsValue({gender: e.target.value})
    }

    const options = [
        { label: 'Male', value: 'male'},
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ]

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    }

    const tailLayout = {
        wrapperCol: { offset: 8, span: 8 },
    }

return (
    <>
        <h1 style={{textAlign: 'center', margin: '50px 0px 20px 0px'}}>Create your account</h1>
        <Form
            {...layout}
            form={form}
            name="basic"
            onFinish={handleSubmit}
        >
            <Form.Item
                label="Avatar"
                name="avatar"
                valuePropName="fileList"
                getValueFromEvent={() => {}}
            >
                <Upload
                    {...props}
                >
                    <Button icon={<UploadOutlined />}>Upload avatar</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: 'Please input your name!' },
                    { min: 8} 
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                label="Gender"
                name="gender"
                initialValue={'other'}
            >
                <Radio.Group options={options} onChange={onChangeGender}/>
            </Form.Item>

            <Form.Item
                label="Age"
                name="age"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Address"
                name="address"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phone"
            >
                <Input/>
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
    )
}