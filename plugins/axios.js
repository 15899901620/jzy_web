import qs from 'qs';

export default function (app) {
  const axios = app.$axios
  axios.defaults.timeout = 100000
  axios.defaults.method = 'get'
  axios.defaults.method = 'post'
  axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  axios.defaults.transformRequest = [
    function(data) {
      console.log('啥',data)
      data = qs.stringify(data)
      return data
    }
  ]
  // 请求回调
  axios.onRequest(config => {})
  // 返回回调
  axios.onResponse(res => {
    const { data, status } = res
    return { data, status }
  })
  // 错误回调
  axios.onError(error => {
    let errorInfo = error.response
      console.log(error.response)

  })

}
