import useSWR from 'swr'
import { Link, Navigate } from 'react-router-dom'
import pig from '../assets/images/pig.svg'
import { AddItemFloatButton } from '../components/AddItmeFloatButton'
import { useAjax } from '../lib/ajax'
import { Loading } from '../components/Loading'
import { useTitle } from '../hooks/useTitle'

interface Props {
  title?: string
}
export const Home: React.FC<Props> = (props) => {
  const { get: getWithLoading } = useAjax({ showLoading: false, handleError: false })
  const { get } = useAjax({ showLoading: false })
  useTitle(props.title)
  const { data: meData, error: meError } = useSWR('/api/v1/me', async path =>
    (await getWithLoading<Resource<User>>(path)).data.resource
  )
  const { data: itemsData } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await get<Resources<Item>>(path)).data
  )
  // dev 访问本地mock服务器，build 访问真实的远程服务器 配置vite.config.ts define(command === serve)

  const isLoadingMe = !meData && !meError
  if (isLoadingMe) {
    return <Loading className="h-screen" message="数据正在加载，请稍等..." />
  }
  // 判断用户是否记过账
  if (itemsData?.resources[0]) {
    return <Navigate to='/items' />
  }

  return (
    <div>
      <div flex justify-center items-center>
        <img mt-20vh mb-20vh width='98' height='100' src={pig} />
      </div>
      <div px-16px>
        <Link to='/items/new'>
          <button j-btn>开始记账</button>
        </Link>
      </div>
      <AddItemFloatButton />
    </div>
  )
}
