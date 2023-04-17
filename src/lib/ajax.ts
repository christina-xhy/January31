import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from '../App';

export const ajax = axios.create({
  baseURL: isDev ? '/' : 'https://mangosteen2.hunger-valley.com/',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})
ajax.interceptors.request.use(function (config) {
  const jwt = localStorage.getItem('jwt') || ''
  config.headers = config.headers || {}
  if (jwt) { config.headers.Authorization = `Bearer ${jwt}` }
  return config;
});



// axios.defaults.baseURL = isDev ? '/' : 'http:121.196.236.94:8080/'
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.timeout = 10000


type Options = {
  showLoading?: boolean
  handleError?: boolean
}
export const useAjax = (options: Options) => {
  const nav = useNavigate()
  const table: Record<string, undefined | (() => void)> = {
    401: () => { nav('/sign_in') },
    402: () => { window.alert('请付费后观看') },
    403: () => { window.alert('没有权限') },
    // unknown: () => { window.alert('未知错误') }
  }
  const showLoading = options?.showLoading || false
  const handleError = options?.handleError ?? true
  const { show, hide } = useContext(LoadingContext)
  //const { setVisible } = useLoadingStore()
  const onError = (error: AxiosError) => {
    if (error.response) {
      if (handleError) {
        const { status } = error.response;
        const fn = table[status]
        fn?.()
      }
    }
    throw error
  }
  return {
    get: <T>(path: string, config?: AxiosRequestConfig<any>) => {
      if (showLoading) { show() }
      return ajax.get<T>(path, config).catch(onError).finally(() => {
        if (showLoading) { hide() }
      })
    },
    post: <T>(path: string, data: JSONValue) => {
      if (showLoading) { show() }
      return ajax.post<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { hide() }
      })
    },
    patch: <T>(path: string, data: JSONValue) => {
      if (showLoading) { show() }
      return ajax.patch<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { hide() }
      })
    },
    destroy: <T>(path: string) => {
      if (showLoading) { show() }
      return ajax.delete<T>(path).catch(onError).finally(() => {
        if (showLoading) { hide() }
      })
    },

  }
}
