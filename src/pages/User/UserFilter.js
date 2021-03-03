import {Input, Button, DatePicker, Col, Row} from 'antd'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {SearchOutlined} from '@ant-design/icons'
import moment from 'moment'

export function UserFilter(props){
    const history = useHistory()
    const dateFormat = 'DD-MM-YYYY'
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const query = new URLSearchParams(props.param)
    // set value for filter if url has query param
    useEffect(() => {
        // create a new instance of URLSearchParams to ignore useEffrect warning
        const query = new URLSearchParams(props.param) 
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
    
    // set state for input value
    const onChangeInput = (e, type) => {
        if(type === 'name'){
            setName(e.target.value)
        }
        if(type === 'email'){
            setEmail(e.target.value)
        }
        if(type === 'address'){
            setAddress(e.target.value)
        }
        if(type === 'phone'){
            setPhone(e.target.value)
        }
    }

    const onChangeCreatedAt = (date) => {
        setCreatedAt(date)
    }

    // push query params to url and set state of parent's params
    const pushQueryStringToUrl = (query) => {
        const result = '?' + query.toString()
        history.push({
            pathname: '/user',
            search: result
        })
        props.onFilterUser(result)
    }

    // handle filter when press enter input
    const onPressEnterInput = (e, type) => {
        if(name.trim() && type === 'name'){
            query.set('username', name.trim())
        }else{
            query.delete('username')
        }
        if(email.trim() && type === 'email'){
            query.set('email', email.trim())
        }else{
            query.delete('email')
        }
        if(address.trim() && type === 'address'){
            query.set('address', address.trim())
        }else{
            query.delete('address')
        }
        if(phone.trim() && type === 'phone'){
            query.set('phone', phone.trim())
        }else{
            query.delete('phone')
        }
        pushQueryStringToUrl(query)
    }

    // hanlde when click filter button
    const onSearchUser = () => {
        if(name.trim()){
            query.set('username', name.trim())
        }
        if(email.trim()){
            query.set('email', email.trim())
        }
        if(address.trim()){
            query.set('address', address.trim())
        }
        if(phone.trim()){
            query.set('phone', phone.trim())
        }
        if(createdAt){
            const createdAtFormat = createdAt.format(dateFormat)
            query.set('created_at', createdAtFormat)
        }
        if(name.trim() || email.trim() || address.trim() || phone.trim() || createdAt){
            pushQueryStringToUrl(query)
        }
    }

    // if clear filter, create a new instance of 'URLSearchParams' with no query param
    const onClearFilter = () => {
        const query = new URLSearchParams() 
        pushQueryStringToUrl(query)
    }

    return (
        <div className='user-filter'>
            <Row>
                <Col span={6} style={{paddingRight: '10px', paddingLeft: '10px'}}><Input placeholder='Search name' value={name} onChange={(e) => {onChangeInput(e, 'name')}} onPressEnter={(e) => {onPressEnterInput(e, 'name')}}/></Col>
                <Col span={6} style={{paddingRight: '10px', paddingLeft: '10px'}}><Input placeholder='Search email' value={email} onChange={(e) => {onChangeInput(e, 'email')}} onPressEnter={(e) => {onPressEnterInput(e, 'email')}}/></Col>
                <Col span={6} style={{paddingRight: '10px', paddingLeft: '10px'}}><Input placeholder='Search address' value={address} onChange={(e) => {onChangeInput(e, 'address')}} onPressEnter={(e) => {onPressEnterInput(e, 'address')}}/></Col>
                <Col span={6} style={{paddingRight: '10px', paddingLeft: '10px'}}><Input placeholder='Search phone' value={phone} onChange={(e) => {onChangeInput(e, 'phone')}} onPressEnter={(e) => {onPressEnterInput(e, 'phone')}}/></Col>
            </Row>
            <Col span={24} style={{ marginTop: '10px', marginBottom: '10px'}}></Col>
            <Row>
                <Col span={6} style={{paddingRight: '10px', paddingLeft: '10px'}}><DatePicker style={{ width: '100%' }} format={dateFormat} value={createdAt} onChange={onChangeCreatedAt}/></Col>
                <Col span={3} style={{paddingRight: '10px', paddingLeft: '10px'}}>
                    <Button style={{width: '100%' }} type='primary' icon={<SearchOutlined />} onClick={onSearchUser}>
                        Search
                    </Button>
                </Col>
                <Col span={3} style={{paddingRight: '10px', paddingLeft: '10px'}}>
                    <Button style={{width: '100%'}} onClick={onClearFilter}>
                        Clear
                    </Button>
                </Col>
            </Row>
        </div>
    )
}