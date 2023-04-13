import { useRef, TouchEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useSWRInfinite from 'swr/infinite'
import { Icon } from '../../components/Icon'
import { useAjax } from '../../lib/ajax'

const Div = styled.div`
  padding:16px;
  text-align: center;
`
interface Props {
  kind: Item['kind']
  value?: Item['tag_ids']
  onChange?: (ids: Item['tag_ids']) => void
}

export const Tags: React.FC<Props> = (props) => {
  const { kind } = props
  // 一、 确定请求的次数  二、返回请求的网页页面
  const getKey = (pageIndex: number, prev: Resources<Item>) => {
    if (prev) {
      const sendCount = (prev.pager.page - 1) * prev.pager.per_page + prev.resources.length
      const count = prev.pager.count
      if (sendCount >= count) { return null }
    }
    return `/api/v1/tags?page=${pageIndex + 1}&kind=${kind}`
  } // 返回当前请求的页码 + 如果没有前一页，一定发送第一页请求

  const { get } = useAjax({ showLoading: true, handleError: true })
  const { data, error, size, setSize } = useSWRInfinite(
    getKey, async path => (await get<Resources<Tag>>(path)).data,
    { revalidateFirstPage: false }
  )
  const onLoadMore = () => {
    setSize(size + 1)
  }
  // 优化加载页面
  const isLoadingInitialData = !data && !error
  const isLoadingMore = data?.[size - 1] === undefined && !error
  const isLoading = isLoadingInitialData || isLoadingMore
  const nav = useNavigate()
  const touchTimer = useRef<number>()
  const touchPosition = useRef<{ x?: number, y?: number }>({ x: undefined, y: undefined })
  const onTouchStart = (e: TouchEvent, id: Tag['id']) => {
    touchTimer.current = window.setTimeout(() => {
      nav(`/tags/${id}`)
    }, 1000)
    const { clientX: x, clientY: y } = e.touches[0]
    touchPosition.current = { x, y }
  }
  const onTouchMove = (e: TouchEvent, id: Tag['id']) => {
    const { clientX: newX, clientY: newY } = e.touches[0]
    const { x, y } = touchPosition.current
    if (x === undefined || y === undefined) { return }
    const distance = Math.sqrt((newX - x) ** 2 + (newY - y) ** 2)
    if (distance > 10) {
      window.clearTimeout(touchTimer.current)
      touchTimer.current = undefined
    }
  }
  const onTouchEnd = (e: TouchEvent<HTMLLIElement>, id: Tag['id']) => {
    if (touchTimer.current) {
      window.clearTimeout(touchTimer.current)
      touchTimer.current = undefined
    }
  }

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
      <div>
        <ol grid grid-cols='[repeat(auto-fit,48px)]' justify-center gap-x-32px gap-y-16px
          py-16px px-8px >
          <li>
            {/* 新增表情 */}
            <Link to={`/tags/new?kind=${kind}`}>
              <span block w-48px h-48px rounded='24px' bg='EFEFEF' flex justify-center items-center
                text-24px b-1 b='#fda4af' text='#fda4af'>
                <Icon name='add' />
              </span>
            </Link>
          </li>
          {
            data.map(({ resources }) => {
              return resources.map((tag) =>
                <li key={tag.id} w-48px flex justify-center items-center flex-col onClick={() => {
                  props.onChange?.([tag.id])
                }}
                  onTouchStart={(e) => onTouchStart(e, tag.id)}
                  onTouchMove={(e) => onTouchMove(e, tag.id)}
                  onTouchEnd={(e) => onTouchEnd(e, tag.id)}
                >
                  {
                    props.value?.includes(tag.id)
                      ? <span block w-48px h-48px rounded='24px' bg='#EFEFEF' flex justify-center items-center
                        text-24px b-1 b='#fbaebe' >{tag.sign}</span>
                      : <span block w-48px h-48px rounded='24px' bg='#EFEFEF' flex justify-center items-center
                        text-24px b-1 b-transparent >{tag.sign}</span>
                  }
                  <span text-12px text='#666'>{tag.name}</span>
                </li>
              )
            })
          }
        </ol>
        {error && <Div>数据加载失败，请刷新页面</Div>}
        {!hasMore
          ? page === 1 && last.resources.length === 0 ? <Div>点击加号，自定义新标签</Div> : <Div>没有更多数据了</Div>
          : isLoading
            ? <Div>数据正在加载中...</Div>
            : <Div> <button j-btn onClick={onLoadMore}>加载更多</button></Div>
        }
      </div>
    )
  }

}


