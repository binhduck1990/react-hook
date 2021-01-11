import { Input, Button, DatePicker, Col, Row } from 'antd';
import { useState, useEffect } from 'react';
import {
    useHistory
  } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

export function UserFilter(props){
    const history = useHistory();
    const dateFormat = 'DD-MM-YYYY';
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const query = new URLSearchParams(props.param)
    useEffect(() => {
        if(query.has('username')){
            setName(query.get('username'))
        }else{
            setName('')
        }
        if(query.has('email')){
            setEmail(query.get('email'))
        }else{
            setEmail('')
        }
        if(query.has('address')){
            setAddress(query.get('address'))
        }else{
            setAddress('')
        }
        if(query.has('phone')){
            setPhone(query.get('phone'))
        }else{
            setPhone('')
        }
        if(query.has('created_at')){
            const createdAt = query.get('created_at')
            if(createdAt){
                setCreatedAt(moment(query.get('created_at'), dateFormat))
            }else{
                setCreatedAt('')
            }    
        }else{
            setCreatedAt('')
        }
      }, [props.param])

    const onChangeName = e => {
        setName(e.target.value)
    }

    const onChangeEmail = e => {
        setEmail(e.target.value)
    }

    const onChangeAddress = e => {
        setAddress(e.target.value)
    }

    const onChangePhone = e => {
        setPhone(e.target.value)
    }

    const onChangeCreatedAt = (date) => {
        setCreatedAt(date)
    }

    const onPressEnterName = () => {
        if(name){
            query.set('username', name)
            const result = "?" + query.toString()
            history.push({
                pathname: '/user',
                search: result
            })
            props.onFilterUser(result)
        }
    }

    const onPressEnterEmail = () => {
        if(email){
            query.set('email', email)
            const result = "?" + query.toString()
            history.push({
                pathname: '/user',
                search: result
            })
            props.onFilterUser(result)
        }
    }

    const onPressEnterAddress = () => {
        if(address){
            query.set('address', address)
            const result = "?" + query.toString()
            history.push({
                pathname: '/user',
                search: result
            })
            props.onFilterUser(result)
        }
    }

    const onPressEnterPhone = () => {
        if(phone){
            query.set('phone', phone)
            const result = "?" + query.toString()
            history.push({
                pathname: '/user',
                search: result
            })
            props.onFilterUser(result)
        }
    }

    const onSearchUser = () => {
        const query = new URLSearchParams()
        if(name){
            query.set('username', name)
        }
        if(email){
            query.set('email', email)
        }
        if(address){
            query.set('address', address)
        }
        if(phone){
            query.set('phone', phone)
        }
        if(createdAt){
            const createdAtFormat = createdAt.format(dateFormat)
            query.set('created_at', createdAtFormat)
        }
        if(name || email || address || phone || createdAt){
            const result = "?" + query.toString()
            history.push({
                pathname: '/user',
                search: result
            })
            props.onFilterUser(result)
        }
    }

    const onClearFilter = () => {
        history.push({
            pathname: '/user'
        })
        props.onFilterUser('')
    }

    return (
        <div className="user-filter">
            <Row>
                <Col span={6} style={{ paddingRight: '10px', paddingLeft: '10px' }}><Input placeholder="search name" value={name} onChange={onChangeName} onPressEnter={onPressEnterName}/></Col>
                <Col span={6} style={{ paddingRight: '10px', paddingLeft: '10px' }}><Input placeholder="search email" value={email} onChange={onChangeEmail} onPressEnter={onPressEnterEmail}/></Col>
                <Col span={6} style={{ paddingRight: '10px', paddingLeft: '10px' }}><Input placeholder="search address" value={address} onChange={onChangeAddress} onPressEnter={onPressEnterAddress}/></Col>
                <Col span={6} style={{ paddingRight: '10px', paddingLeft: '10px' }}><Input placeholder="search phone" value={phone} onChange={onChangePhone} onPressEnter={onPressEnterPhone}/></Col>
            </Row>
            <Col span={24} style={{ marginTop: '10px', marginBottom: '10px' }}></Col>
            <Row>
                <Col span={6} style={{ paddingRight: '10px', paddingLeft: '10px' }}><DatePicker style={{ width: '100%' }} format={dateFormat} value={createdAt} onChange={onChangeCreatedAt}/></Col>
                <Col span={3} style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                    <Button style={{ width: '100%' }} type="primary" icon={<SearchOutlined />} onClick={onSearchUser}>
                        Search
                    </Button>
                </Col>
                <Col span={3} style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                    <Button style={{ width: '100%' }} type="primary" danger onClick={onClearFilter}>
                        Clear
                    </Button>
                </Col>
            </Row>
        </div>
    )
}