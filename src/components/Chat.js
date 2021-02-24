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
