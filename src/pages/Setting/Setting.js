import {SideBar} from '../../components/Sidebar'
import {Button, Upload, notification} from 'antd'
import {UploadOutlined} from '@ant-design/icons'

export function Setting(){
    const apiDomain = process.env.REACT_APP_API
    const props = {
        name: 'avatar',
        action: `${apiDomain}/api/setting/upload-default-avatar`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        onChange(info) {
          if (info.file.status === 'done') {
            notification['success']({
                message: `${info.file.name} file uploaded successfully`
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000)
          } else if (info.file.status === 'error') {
            notification['error']({
                message: `${info.file.name} file upload failed`
            })
          }
        },
      }
    return (
        <SideBar>
            <Upload {...props} listType='picture-card' fileList={[{
                url: `${apiDomain}/images/default_avatar.jpeg`
            }]}>
                <Button icon={<UploadOutlined />}>Upload default avatar</Button>
            </Upload>
        </SideBar>
        )
}