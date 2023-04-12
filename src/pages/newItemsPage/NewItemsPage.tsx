import type { ReactNode } from 'react'
import { Gradient } from '../../components/Gradient'
import { Icon } from '../../components/Icon'
import { Tabs } from '../../components/Tabs'
import { TopNav } from '../../components/TopNav'
import s from './NewItemsPage.module.scss'
import { ItemAmount } from './ItemAmount'
import { Tags } from './Tags'
import { useCreateItemStore } from '../../stores/useCreateItemStore'
import { ItemDate } from './ItemDate'

export const NewItemsPage: React.FC = () => {
  const { data, setData, setError } = useCreateItemStore()
  const tabItems: { key: Item['kind']; text: string; element?: ReactNode }[] = [
    { key: 'expenses', text: '支出', element: <Tags kind='expenses' value={data.tag_ids} onChange={ids => setData(({ tag_ids: ids }))} /> },
    { key: 'income', text: '收入', element: <Tags kind='income' value={data.tag_ids} onChange={ids => setData(({ tag_ids: ids }))} /> },
  ]
  return (
    <div className={s.wrapper} h-screen flex flex-col>
      <Gradient className='grow-0 shrink-0'>
        <TopNav title='记一笔' icon={<Icon name='back' />} />
      </Gradient>
      <Tabs className='children-flex-1 flex-1 text-center grow-1 shrink-1 overflow-hidden' tabItems={tabItems} classPrefix='itemsNewPage'
        value={data.kind!} onChange={(item) => { setData({ kind: item }) }} />
      <div>{JSON.stringify(data)}</div>
      <ItemAmount className='grow-0 shrink-0' dateValue={data.happen_at} dateChange={(happen_at) => setData({ happen_at })}
        itemDate={<ItemDate value={data.happen_at} onChange={(happen_at) => setData({ happen_at })} />}
        value={data.amount} onChange={amount => setData({ amount })} />
    </div>
  )
}
