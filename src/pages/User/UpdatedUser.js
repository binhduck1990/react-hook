import React, {useEffect} from "react"
import {Form, Input, Button, Upload, Radio} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import {useAuth} from '../.././components/Auth'
import {SideBar} from '../../components/Sidebar'
import {
    useParams
} from "react-router-dom"

export function UpdatedUser() {
    const {id} = useParams()
    const auth = useAuth()
    const [form] = Form.useForm()
    
    useEffect(() => { 
        auth.detail(id, (res) => {
          form.setFieldsValue({
            username: res.data.user.username,
            email: res.data.user.email,
            age: res.data.user.age,
            phone: res.data.user.phone,
            address: res.data.user.address,
            gender: res.data.user.gender,
            avatar: [{
                uid: '-1',
                name: res.data.user.avatar,
                status: 'done',
                url: `http://localhost:4000/images/${res.data.user.avatar}`
            }]
          })
        })
    }, [auth, id, form])
  
    const handleSubmit = () => {
        const formData = new FormData()
        const email = form.getFieldValue('email')
        const age = form.getFieldValue('age') 
        const phone = form.getFieldValue('phone') 
        const address = form.getFieldValue('address') 
        const username = form.getFieldValue('username') 
        const gender = form.getFieldValue('gender') 
        const fileList = form.getFieldValue('avatar')

        formData.append('email', email)
        formData.append('age', age)
        formData.append('phone', phone)
        formData.append('address', address)
        formData.append('username', username)
        formData.append('gender', gender)
        if(!fileList){
            formData.append('default_avatar', true)
        }else{
            if(fileList[0].uid !== '-1'){
                formData.append('avatar', fileList[0])
            }
        }

        auth.update(id, formData, () => {
        }, (errors) => {
            
        })
    }

    const onReset = () => {
        form.resetFields()
    }

    const props = {
        onRemove: () => {
            form.setFieldsValue({avatar: []})
        },
        beforeUpload(file){
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                file.url = reader.result
                form.setFieldsValue({avatar: [file]})
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
        wrapperCol: { span: 8 }
    }

    const tailLayout = {
        wrapperCol: { offset: 8, span: 8 }
    }

return (
    <SideBar>
        <h1 style={{textAlign: 'center', margin: '15px 0px 20px 0px'}}>Update your account</h1>
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
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload avatar</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: 'Please input your name!' },
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
                label="Gender"
                name="gender"
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
                    Update
                </Button>
                <Button type="danger" htmlType="button" onClick={onReset}>
                    Clear
                </Button>
            </Form.Item>
        </Form>
    </SideBar>
    )
}