import axios, { AxiosError } from 'axios'
import { FormEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input/Input'
import { TopNav } from '../components/TopNav'
import { useAjax } from '../lib/ajax'
import { FormError, hasError, validate } from '../lib/validate'
import { useSignInStore } from '../stores/useSignInStore'

export const SignInPage: React.FC = () => {
  const nav = useNavigate()
  const { data, error, setError, setData } = useSignInStore()
  const { post: postWithLoading } = useAjax({ showLoading: true })
  const { post: postWithoutLoading } = useAjax({ showLoading: false })

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const onSubmitError = (error: AxiosError<{ errors: FormError<typeof data> }>) => {
      //后端的error直接可以setError，特殊情况需要格式转换
      //检查校验格式以及
      setError(error.response?.data.errors ?? {})
      throw error
    }
    const newError = validate(data, [
      { key: 'email', type: 'required', message: '请输入邮箱地址' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱地址格式不正确' },
      { key: 'code', type: 'required', message: '请输入验证码' },
      { key: 'code', type: 'length', min: 6, max: 6, message: '验证码必须是6个字符' },
    ])

    setError(newError)
    if (!hasError(newError)) {
      const response = await postWithoutLoading<{ jwt: string }>('http://121.196.236.94:8080/api/v1/session', data)
        .catch(onSubmitError)
      const jwt = response.data.jwt
      localStorage.setItem('jwt', jwt)
      nav('/items')
    }
  }

  const sendSmsCode = async () => {
    const newError = validate({ email: data.email }, [
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱地址格式不正确' },
    ])
    setError(newError)
    if (hasError(newError)) {
      //如果校验格式错误，显示错误
      setError(newError)
      //依然需要校验axios的请求后是否正确，因为这个函数的结果会传给request，必须拿到结果如果是错误抛出错误
      //return undefined 表示默认是成功的，会出现bug，直接退出不执行后面的代码
      throw new Error('表单出错')
    }
    const response = await postWithLoading('http://121.196.236.94:8080/api/v1/validation_codes',
      { email: data.email }
    )
    console.log(response)
    console.log('right')
    return response
  }
  return (
    <div>
      <Gradient>
        <TopNav title='登录' icon={<Icon name='back'></Icon>} />
      </Gradient>
      <div text-center pt-40px pb-16px>
        <Icon name='logo' className='w-64px h-68px'></Icon>
        <h1 text-28px text='#fda4af' font-bold>ali记账</h1>
      </div>
      <form j-form onSubmit={onSubmit}>
        <Input label='邮箱地址' type='text' placeholder='请输入邮箱，然后点击发送验证码' value={data.email}
          onChange={email => setData({ email })} error={error.email?.[0]} />
        <Input type='sms_code' label='验证码' placeholder='6位数字' value={data.code}
          onChange={code => setData({ code })}
          error={error.code?.[0]} request={sendSmsCode} />
        <div px-16px mt-70px>
          <button j-btn type='submit'>登录</button>
        </div>
      </form>
    </div>
  )
}
