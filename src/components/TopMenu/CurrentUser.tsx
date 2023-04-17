import { Link, useLocation } from 'react-router-dom'
import useSWR from 'swr'
import { useAjax } from '../../lib/ajax'
import { comfirmable } from '../../lib/comfirmable'
interface Props {
  className?: string
}

export const CurrentUser: React.FC<Props> = ({ className }) => {
  const { get } = useAjax({ showLoading: false, handleError: false })
  const { data: me, error } = useSWR('/api/v1/me', async (path) => (
    await get<Resource<User>>(path)).data.resource
  )
  const name = me?.name ?? me?.email
  const loc = useLocation()
  const from = encodeURIComponent(`${loc.pathname}${loc.search}`)
  const signOut = comfirmable('确定要退出登陆吗', () => {
    window.localStorage.removeItem('jwt')
    window.localStorage.reload()
  })
  return (
    <div block className={className} bg='#fda4af' text-white w='100%' pt-32px pb-44px>
      {error
        ? <>
          <Link to={`/sign_in?from=${from}`}>
            <h2 text-24px>未登录用户</h2>
            <div text='#CEA1FF'>登录</div>
          </Link>
        </>
        : <>
          <div onClick={signOut}>
            <h2 text-24px overflow-hidden>{name}</h2>
            <div text='#CEA1FF'>退出登录</div>
          </div>
        </>
      }
    </div>
  )
}
// block link曾经是内联元素，html的div 是块级元素，内联元素无法包裹块级元素。现在没有区分，保险起见加个block
