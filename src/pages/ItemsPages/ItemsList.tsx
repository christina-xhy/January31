import styled from 'styled-components'
import useSWRInfinite from 'swr/infinite'
import { useAjax } from '../../lib/ajax'
import { time, Time } from '../../lib/time'

const Div = styled.div`
  padding:16px;
  text-align: center;
`

type Props = {
  start: Time
  end: Time
}
export const ItemsList: React.FC<Props> = (props) => {
  const { start, end } = props
  // 一、 确定请求的次数  二、返回请求的网页页面
  const getKey = (pageIndex: number, prev: Resources<Item>) => {
    if (prev) {
      const sendCount = (prev.pager.page - 1) * prev.pager.per_page + prev.resources.length
      const count = prev.pager.count
      if (sendCount >= count) { return null }
    }
    return `/api/v1/items?page=${pageIndex + 1}&`
      + `happened_after=${start.removeTime().isoString}&`
      + `happened_before=${end.removeTime().isoString}`
  } // 返回当前请求的页码 + 如果没有前一页，一定发送第一页请求
  const { get } = useAjax({})
  const { data, error, size, setSize } = useSWRInfinite(
    getKey, async path => (await get<Resources<Item>>(path)).data,
    { revalidateAll: true }
  )
  const onLoadMore = () => {
    setSize(size + 1)
  }
  // 优化加载页面
  const isLoadingInitialData = !data && !error
  const isLoadingMore = data?.[size - 1] === undefined && !error
  const isLoading = isLoadingInitialData || isLoadingMore


  if (!data) {
    return (
      <Div >
        {error && <div>not success</div>}
        {isLoading && <Div>数据正在加载中...</Div>}
      </Div>
    )
  } else {
    const last = data[data.length - 1]
    const { page, per_page, count } = last.pager
    const hasMore = (page - 1) * per_page + last.resources.length < count

    return (
      <>
        <ol>
          {
            data.map(({ resources }) => {
              return resources.map((item) => {
                return (
                  <li key={item.id} b-solid b='#eee' grid grid-cols='[auto_1fr_auto]' grid-rows-2 px-16px py-8px gap-x-12px >
                    <div row-start-1 col-start-1 row-end-3 col-end-2 text-24px
                      w-48px h-48px bg='#EFEFEF' rounded-50px flex justify-center items-center b-1 border-b='#EEE'>
                      {item.tags?.[0].sign}
                    </div>
                    <div row-start-1 col-start-2 row-end-2 col-end-3 text='#000000'>
                      {item.tags?.[0].name}
                    </div>
                    <div row-start-2 col-start-2 row-end-3 col-end-4 text='#999999'>
                      {time(item.happen_at).format('yyyy-MM-dd HH:mm')}
                    </div>
                    <div row-start-1 col-start-3 row-end-2 col-end-4 text='#53A867'>
                      ¥{item.amount / 100}
                    </div>
                  </li>
                )
              })
            })
          }
        </ol>
        {error && <Div>数据加载失败，请刷新页面</Div>}

        {!hasMore
          ? <Div>没有更多数据了</Div>
          : isLoading
            ? <Div>数据正在加载中...</Div>
            : <Div> <button j-btn onClick={onLoadMore}>加载更多</button></Div>
        }
      </>
    )
  }
}
