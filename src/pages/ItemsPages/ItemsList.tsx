import useSWRInfinite from 'swr/infinite'
import { ajax } from '../../lib/ajax'
//一、 确定请求的次数  二、返回请求的网页页面
const getKey = (pageIndex:number,prev: Resources<Item>) =>{
  if(prev){
    const sendCount = (prev.pager.page - 1 )* prev.pager.per_page + prev.resources.length
    const count = prev.pager.count
    if(sendCount >= count ) { return null }
  }
  return `/api/v1/items?page=${pageIndex + 1}`
} //返回当前请求的页码 + 如果没有前一页，一定发送第一页请求

export const ItemsList : React.FC<Props> = () => {
  const {data,error,size,setSize} =useSWRInfinite(
    getKey,async (path)=>(await ajax.get<Resources<Item>>(path)).data
  )
  const onLoadMore = () =>{
    setSize(size + 1)
  }

  if(!data){
    return <span>not success</span>
  }else{    
    const last = data[data.length -1]
    const {page,per_page, count} = last.pager
    const hasMore = (page - 1) * per_page + last.resources.length < count
    return (
    <>
      <ol>
        {
          data.map(({ resources }) => {
            console.log("line 25");
            
            return resources.map((item) => {
              return (
                <li key={item.id} grid grid-cols='[auto_1fr_auto]' grid-rows-2 px-16px py-8px gap-x-12px >
                    <div row-start-1 col-start-1 row-end-3 col-end-2 text-24px 
                    w-48px h-48px bg='#EFEFEF' rounded-50px flex justify-center items-center border-b-1 border-b='#EEE'>
                    😘
                    </div>
                    <div row-start-1 col-start-2 row-end-2 col-end-3 text='#000000'>
                    {item.note}
                    </div>
                    <div row-start-2 col-start-2 row-end-3 col-end-4 text='#999999'>
                    {item.created_at}
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

      
        {hasMore 
        ? <div p-16px text-center> <button j-btn onClick = { onLoadMore }>加载更多...</button></div>
        : <div text-center>没有更多数据了</div>}
    </>
    )
  }
}