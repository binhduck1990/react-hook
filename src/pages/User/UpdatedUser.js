import './User.css'
import React, {useEffect, useState} from 'react'
import {Form, Input, Button, Upload, Radio, InputNumber, DatePicker, Space, notification} from 'antd'
import {UploadOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import {useAuth} from '../.././components/Auth'
import {SideBar} from '../../components/Sidebar'
import {useParams, useHistory} from 'react-router-dom'
import moment from 'moment'

export function UpdatedUser() {
    const {id} = useParams()
    const auth = useAuth()
    const history = useHistory()
    const [user, setUser] = useState({})
    const [form] = Form.useForm()
    
    useEffect(() => { 
        auth.detail(id, (res) => {
            setUser(res.data.user)
            form.setFieldsValue({
                username: res.data.user.username,
                email: res.data.user.email,
                age: res.data.user.age,
                birthday: res.data.user.birthday ? moment(res.data.user.birthday, 'DD-MM-YYYY') : undefined,
                hobbies: res.data.user.hobbies,
                phone: res.data.user.phone,
                address: res.data.user.address,
                gender: res.data.user.gender ? res.data.user.gender : 'other',
                avatar: res.data.user.avatar ? [{
                    uid: '-1',
                    name: res.data.user.avatar,
                    status: 'done',
                    url: `http://localhost:4000/images/${res.data.user.avatar}`
                    }] : [{
                        uid: '-1',
                        status: 'done',
                        name: 'choose file to upload'
                }]
            })
        })
    }, [auth, id, form])
  
    const handleSubmit = (values) => {
        const formData = new FormData()
        const {email, age, phone, address, username, gender, avatar, birthday, hobbies} = values
        formData.append('phone', phone)
        formData.append('address', address)
        formData.append('username', username)
        formData.append('email', email)
        formData.append('gender', gender)
        if(age !== null){
            formData.append('age', age)
        }else{
            formData.append('age', '')
        }
        if(hobbies && hobbies.length){
            hobbies.forEach((item) => formData.append('hobbies[]', item))
        }
        if(birthday instanceof moment){
            formData.append('birthday', birthday.format())
        }
        if(!avatar){
            formData.append('default_avatar', true)
        }else{
            if(avatar[0] instanceof File){
                formData.append('avatar', avatar[0])
            }
        }
        auth.update(id, formData, (res) => {
            notification['success']({
                message: res.data.message
            })
        }, (error) => {
            auth.handleError(error, history)
        })
    }

    const onReset = () => {
        form.setFieldsValue({
            username: user.username,
            email: user.email,
            age: user.age,
            birthday: user.birthday ? moment(user.birthday, 'DD-MM-YYYY') : undefined,
            hobbies: user.hobbies,
            phone: user.phone,
            address: user.address,
            gender: user.gender ? user.gender : 'other',
            avatar: user.avatar ? [{
                uid: '-1',
                name: user.avatar,
                status: 'done',
                url: `http://localhost:4000/images/${user.avatar}`
                }] : [{
                    uid: '-1',
                    status: 'done',
                    name: 'choose file to upload'
            }]
        })
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
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
        {label: 'Other', value: 'other'}
    ]

    const formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 8}
    }

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {span: 8},
            sm: {span: 8, offset: 8 }
        }
    }

return (
    <SideBar>
        <h1 style={{textAlign: 'center', margin: '15px 0px 20px 0px'}}>Update your account</h1>
        <Form
            {...formItemLayout}
            form={form}
            name='basic'
            onFinish={handleSubmit}
        >
            <Form.Item
                label='Username'
                name='username'
                rules={[
                    {required: true, message: 'Please input your name!'},
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label='Email'
                name='email'
                rules={[{required: true, message: 'Please input your email!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label='Avatar'
                name='avatar'
                valuePropName='fileList'
                getValueFromEvent={() => {}}
            >
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload avatar</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                label='Gender'
                name='gender'
            >
                <Radio.Group options={options} onChange={onChangeGender}/>
            </Form.Item>

            <Form.Item 
                label='Birthday'
                name='birthday'
            >
                <DatePicker format={'DD-MM-YYYY'}/>
            </Form.Item>

            <Form.Item
                label='Age'
                name='age'
                rules={[{type: 'number', min: 0, max: 99}]}
            >
                <InputNumber/>
            </Form.Item>

            <Form.Item
                label='Address'
                name='address'
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label='Phone'
                name='phone'
            >
                <Input/>
            </Form.Item>

            <Form.List
                name='hobbies'
            >
                {(fields, { add, remove }, { errors }) => (
                <>
                    <Form.Item {...formItemLayout} label='Hobbies'>
                        <Button
                            type='dashed'
                            onClick={() => add()}
                            style={{width: '60%'}}
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
                                    {max: 10, message: 'Your hobby max 50 characters'},
                                    {required: true, message: 'Please input your hobby!'}
                                ]}
                                noStyle
                            >
                            <Input style={{width: '60%'}} />
                            </Form.Item>
                            <MinusCircleOutlined
                                className='dynamic-delete-button'
                                onClick={() => remove(field.name)}
                            />
                        </Form.Item>
                    ))}
                </>
                )}
            </Form.List>

            <Form.Item {...formItemLayoutWithOutLabel}>
                <Space>
                    <Button type='primary' htmlType='submit'>
                        Update
                    </Button>
                    <Button htmlType='button' onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    </SideBar>
    )
}