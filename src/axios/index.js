import axios from 'axios';

let root = process.env.API_ROOT;

// 自定义判断元素类型
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull (o) {
  for (let key in o) {
    if (o.hasOwnProperty(key)) {
      if (o[key] === null) {
        delete o[key]
      }
      if (toType(o[key]) === 'string') {
        o[key] = o[key].trim()
      } else if (toType(o[key]) === 'object') {
        o[key] = filterNull(o[key])
      } else if (toType(o[key]) === 'array') {
        o[key] = filterNull(o[key])
      }
    }
  }
  return o
}

function apiAxios (method, url, params, success, failure) {
  if (params) {
    params = filterNull(params);
  } else {
    params = new URLSearchParams();
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root/*,
    withCredentials: true*/
  }).then(function (res) {
    if (success) {
      success(res.data)
    }
  }).catch(function (err) {
    let res = err.response;
    if (err) {

    }
  })
}

// http request
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

// http response
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
);

export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  login: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  downUrl: function () {
    return root
  }
}
