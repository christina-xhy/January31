import axios, { AxiosRequestConfig } from 'axios'
import { useContext } from 'react';
import { LoadingContext } from '../App';

axios.defaults.baseURL = isDev ? '/' : 'http:121.196.236.94:8080/api/v1'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000


axios.interceptors.request.use(function (config) {
  const jwt = localStorage.getItem('jwt') || ''
  config.headers = config.headers || {}
  if (jwt) { config.headers.Authorization = `Bearer ${jwt}` }
  return config;
});

type Options = {
  showLoading?: boolean
}
export const useAjax = (options: Options) => {
  const showLoading = options?.showLoading || false
  const { show, hide } = useContext(LoadingContext)
  const ajax = {
    get: <T>(path: string, config?: AxiosRequestConfig<any>) => {
      return axios.get<T>(path, config)
    },
    post: <T>(path: string, data: JSONValue) => {
      if (showLoading) { show() }
      return axios.post<T>(path, data).finally(() => {
        if (showLoading) { hide() }
      })
    },
    patch: () => { },
    delete: () => { }
  }
  return ajax
}