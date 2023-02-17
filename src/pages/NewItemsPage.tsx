import type { ReactNode } from 'react'
import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import s from './NewItemsPage.module.scss'

type ItemKind = 'income' | 'expenses'
export const NewItemsPage: React.FC = () => {
  const tabItems: { key: ItemKind; text: string; element?: ReactNode }[] = [
    { key: 'expenses', text: '支出', element: <div>支出</div> },
    { key: 'income', text: '收入', element: <div>收入</div> },
  ]
  const [tabItem, setTabItem] = useState<ItemKind> ('expenses')
  return (
  <div className={s.wrapper} h-screen flex flex-col>
   <Gradient className='grow-0 shrink-1'>
    <TopNav title='记一笔' icon={<Icon name='back'/>}/>
   </Gradient>
    <Tabs className='children-flex-1 flex-1 text-center' tabItems={tabItems} classPrefix='itemsNewPage'
     value={tabItem} onChange={(item) => { setTabItem(item) } }/>
  </div>
  )
}
