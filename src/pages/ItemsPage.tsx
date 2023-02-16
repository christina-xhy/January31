import { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItmeFloatButton'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopMeue } from '../components/TopMenu'
import { TopNav } from '../components/TopNav'
import { useTitle } from '../hooks/useTitle'
import { useMenuStore } from '../stores/useMenuStore'
import { ItemsList } from './ItemsPages/ItemsList'
import { ItemsSummary } from './ItemsPages/ItemsSummary'

interface Props {
  title?: string
}

export const ItemsPage: React.FC<Props> = (props) => {
  useTitle(props.title)
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const { visible, setVisible } = useMenuStore()
  return (
   <div>
      <Gradient>
        <TopNav title ='账目列表' icon = {
        <Icon name='menu' className = 'w-24px h-24px' onClick={() => { setVisible(!visible) }}></Icon>
        }/>
      <TimeRangePicker selected = {timeRange} onSelected={setTimeRange} />
      </Gradient>
      <ItemsSummary />
      <ItemsList />
      <AddItemFloatButton />
      <TopMeue visible = {visible} onClickMask={() => { setVisible(false) }}/>
   </div>
  )
}
