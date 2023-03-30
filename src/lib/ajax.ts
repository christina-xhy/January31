import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = isDev ? '/' : 'http:121.196.236.94:8080/api/v1'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000

axios.interceptors.request.use(function (config) {
  const jwt = localStorage.getItem('jwt') || ''
  config.headers = config.headers || {}
  if (jwt) { config.headers.Authorization = `Bearer ${jwt}` }
  return config;
});

export const ajax = {
  get: <T>(path: string, config?: AxiosRequestConfig<any>) => {
    return axios.get<T>(path, config)
  },
  post: <T>(path: string, data: JSONValue) => {
    return axios.post<T>(path, data)
  },
  patch: () => { },
  delete: () => { }
}
