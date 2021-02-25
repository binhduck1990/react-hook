import axios from 'axios'

export function chat(filter = '', cb_success = null, cb_error = null) {
    axios.get(
      `http://localhost:4000/api/chat/${filter}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).then(res => {
      if(typeof(cb_success) == "function"){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function"){
        cb_error(error)
      }
    })
}

export function createdChat(formData, cb_success = null, cb_error = null) {
    const config = {
      "headers": {
        "content-type": 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.post(
      `http://localhost:4000/api/chat`, formData, config
    ).then(res => {
      if(typeof(cb_success) == "function"){
        cb_success(res)
      }
    }).catch(error => {
      if(typeof(cb_error) == "function"){
        cb_error(error)
      }
    })
  }
