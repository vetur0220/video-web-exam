import axios from 'axios';
import { showMessage } from "./status";  
import { ElMessage } from 'element-plus'  

axios.defaults.timeout = 60000;
axios.defaults.baseURL = '';
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
      
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { response } = error;
    if (response) {
      showMessage(response.status);
      return Promise.reject(response.data);
    } else {
      ElMessage.warning('網路連結異常！');
    }
  }
);

export function request(url = '', params = {}, type = 'POST') {
  return new Promise((resolve, reject) => {
    let promise
    if (type.toUpperCase() === 'GET') {
      promise = axios({
        url,
        params
      })
    } else if (type.toUpperCase() === 'POST') {
      promise = axios({
        method: 'POST',
        url,
        data: params
      })
    }
    promise.then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
