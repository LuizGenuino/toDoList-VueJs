//import {AuthService} from '../../index'

const statusHttp = {
    execute (response) {
      if(statusHttp[response.status])
        statusHttp[response.status](response)
  
      statusHttp.default(response)
    },
  
    401: async () => {
      localStorage.removeItem('ToDoList@user')
      localStorage.removeItem('ToDoList@token')
      //await new AuthService().signOut()
      //window.location.reload()
    },
  
    default: (response) => {
      if(response.headers.authorization) {
        localStorage.setItem('ToDoList@token', response.headers.authorization)
      }
    }
  }
  
  export default {
    response (response) {
      statusHttp.execute(response)
      return response
    },
  
    error (error) {
      console.error('Response Interceptor Error: ', error)
      statusHttp.execute(error.response)
      return Promise.reject(error)
    }
  }
  