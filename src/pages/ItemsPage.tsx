import { time } from '../lib/time'
import { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItmeFloatButton'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopMenu } from '../components/TopMenu'
import { TopNav } from '../components/TopNav'
import { useTitle } from '../hooks/useTitle'
import { Time } from '../lib/time'
import { TimeRangeToStartAndEnd } from '../lib/TimeRangeToStartAndEnd'
import { useMenuStore } from '../stores/useMenuStore'
import { ItemsList } from './ItemsPages/ItemsList'
import { ItemsSummary } from './ItemsPages/ItemsSummary'

interface Props {
  title?: string
  start: Time
  end: Time
}

export const ItemsPage: React.FC<Props> = (props) => {
  useTitle(props.title)
  const [timeRange, setTimeRange] = useState<TimeRange>({
    name: 'thisMonth',
    start: time().firstDayOfMonth,
    end: time().lastDayOfMonth.add(1, 'day')
  })
  const { start, end } = TimeRangeToStartAndEnd(timeRange)
  const { visible, setVisible } = useMenuStore()
  return (
    <div>
      <Gradient>
        <TopNav title='账目列表' icon={
          <Icon name='menu' className='w-24px h-24px' onClick={() => { setVisible(!visible) }}></Icon>
        } />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange} />
      <ItemsSummary />
      <ItemsList start={start} end={end} />
      <AddItemFloatButton />
      <TopMenu visible={visible} onClickMask={() => { setVisible(false) }} />
    </div>
  )
}
