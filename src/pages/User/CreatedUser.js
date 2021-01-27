import {Form, Input, Button, Upload, Radio, InputNumber, Space, DatePicker} from 'antd'
import {UploadOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import {useAuth} from '../.././components/Auth'
import {useHistory, useLocation} from "react-router-dom"
import moment from 'moment'

export function CreatedUser() {
    const auth = useAuth()
    let history = useHistory()
    let location = useLocation()
    const [form] = Form.useForm()
  
    const handleSubmit = (values) => {
        let { from } = location.state || { from: { pathname: "/user" } }
        const {email, password, age, phone, address, username, gender, avatar, birthday, hobbies} = values
        const formData = new FormData()
        if(email) formData.append('email', email)
        if(password) formData.append('password', password)
        if(age) formData.append('age', age)
        if(phone) formData.append('phone', phone)
        if(address) formData.append('address', address)
        if(username) formData.append('username', username)
        if(gender) formData.append('gender', gender)
        if(avatar) formData.append('avatar', avatar[0])
        if(hobbies.length){
            hobbies.forEach((item) => formData.append("hobbies[]", item))
        }
        if(birthday instanceof moment){
            formData.append('birthday', birthday.format())
        }
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
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' }
    ]

    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 }
    }

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 8},
            sm: { span: 8, offset: 8 }
        }
    }

return (
    <>
        <h1 style={{textAlign: 'center', margin: '50px 0px 20px 0px'}}>Create your account</h1>
        <Form
            {...formItemLayout}
            form={form}
            name="basic"
            onFinish={handleSubmit}
        >
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
                label="Gender"
                name="gender"
                initialValue={'other'}
            >
                <Radio.Group options={options} onChange={onChangeGender}/>
            </Form.Item>

            <Form.Item
                label="Age"
                name="age"
                rules={[{ type: 'number', min: 0, max: 99 }]}
            >
                <InputNumber/>
            </Form.Item>

            <Form.Item 
                label="Birthday"
                name="birthday"
            >
                <DatePicker format={'DD-MM-YYYY'}/>
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

            <Form.List
                name="hobbies"
            >
                {(fields, { add, remove }, { errors }) => (
                <>
                    <Form.Item {...formItemLayout} label="Hobbies">
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            style={{ width: '60%' }}
                            icon={<PlusOutlined />}
                        >
                            Add your hobby
                        </Button>
                    </Form.Item>
                    {fields.map((field, index) => (
                        <Form.Item
                            {...formItemLayoutWithOutLabel}
                            key={field.key}
                        >
                            <Form.Item
                                {...field}
                                rules={[
                                    { max: 10, message: 'Your hobby max 50 characters'},
                                    { required: true, message: 'Please input your hobby!' }
                                ]}
                                noStyle
                            >
                            <Input style={{ width: '60%' }} />
                            </Form.Item>
                            <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => remove(field.name)}
                            />
                        </Form.Item>
                    ))}
                </>
                )}
            </Form.List>

            <Form.Item {...formItemLayoutWithOutLabel}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Signup
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    </>
    )
}