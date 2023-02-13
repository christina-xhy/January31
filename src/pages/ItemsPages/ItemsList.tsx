import useSWRInfinite from 'swr/infinite'
import { ajax } from '../../lib/ajax'

const getKey = (pageIndex:number) =>{
  return `/api/v1/items?page=${pageIndex + 1}`
}
export const ItemsList : React.FC<Props> = () => {
  const {data,error} =useSWRInfinite(
    getKey,async (path)=>(await ajax.get<Resources<Item>>(path)).data
  )
  console.log(data,error)


  const items: Item[] =[]
  return(
  <div>
      <ol>
        {items.map(item =>
          <li key={item.id} grid grid-cols='[auto_1fr_auto]' grid-rows-2 px-16px py-8px gap-x-12px >
            <div row-start-1 col-start-1 row-end-3 col-end-2 text-24px 
              w-48px h-48px bg='#EFEFEF' rounded-50px flex justify-center items-center border-b-1 border-b='#EEE'>
              😘
            </div>
            <div row-start-1 col-start-2 row-end-2 col-end-3 text='#000000'>
              traveling
            </div>
            <div row-start-2 col-start-2 row-end-3 col-end-4 text='#999999'>
              2011年1月1日
            </div>
            <div row-start-1 col-start-3 row-end-2 col-end-4 text='#53A867'>
              ¥999
            </div>
          </li>)}
      </ol>
      <div p-16px>
        <button j-btn>加载更多...</button>
      </div>
    </div>
)}