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
import { useMenuStore } from '../stores/useMenuStore'
import { ItemsList } from './ItemsPages/ItemsList'
import { ItemsSummary } from './ItemsPages/ItemsSummary'

interface Props {
  title?: string
  start: Time
  end: Time
  error: () => void
}

export const ItemsPage: React.FC<Props> = (props) => {
  useTitle(props.title)
  const [timeRange, _setTimeRange] = useState<TimeRange>({
    name: 'thisMonth',
    start: time().firstDayOfMonth,
    end: time().lastDayOfMonth.add(1, 'day')
  })
  const [outOfRange, setOutOfRange] = useState(false)
  const setTimeRange = (t: TimeRange) => {
    if (t.start.timesStamp > t.end.timesStamp) {
      [t.start, t.end] = [t.end, t.start]
    }
    if (t.end.timesStamp - t.start.timesStamp > Time.DAY * 365) {
      setOutOfRange(true)
    }
    _setTimeRange(t)
  }

  const { start, end } = timeRange
  const { visible, setVisible } = useMenuStore()
  const error = () => {
    window.alert('xxxx')
  }
  return (
    <div>
      <Gradient>
        <TopNav title='账目列表' icon={
          <Icon name='menu' className='w-24px h-24px' onClick={() => { setVisible(!visible) }}></Icon>
        } />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange} />
      {
        outOfRange
          ? <div text-center p-32px>请重新选择日期,不能超过365天</div>
          :
          <>
            <ItemsSummary />
            <ItemsList start={start} end={end} />
          </>
      }
      <AddItemFloatButton />
      <TopMenu visible={visible} onClickMask={() => { setVisible(false) }} />
    </div>
  )
}
