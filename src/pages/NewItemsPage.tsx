import type { ReactNode } from 'react'
import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import s from './NewItemsPage.module.scss'
import { DateAndAmount } from './newItemsPage/DateAndAmount'
import { Tags } from './newItemsPage/Tags'
export const NewItemsPage: React.FC = () => {
  const tabItems: { key: Item['kind']; text: string; element?: ReactNode }[] = [
    { key: 'expenses', text: '支出', element: <Tags kind='expenses'/> },
    { key: 'income', text: '收入', element: <Tags kind='income'/> },
  ]
  const [tabItem, setTabItem] = useState<Item['kind']> ('expenses')
  return (
  <div className={s.wrapper} h-screen flex flex-col>
   <Gradient className='grow-0 shrink-0'>
     <TopNav title='记一笔' icon={<Icon name='back'/>}/>
   </Gradient>
     <Tabs className='children-flex-1 flex-1 text-center grow-1 shrink-1 overflow-hidden' tabItems={tabItems} classPrefix='itemsNewPage'
     value={tabItem} onChange={(item) => { setTabItem(item) } }/>
     <DateAndAmount className='grow-0 shrink-0'/>
  </div>
  )
}
