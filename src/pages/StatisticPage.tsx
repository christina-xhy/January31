import { useEffect, useState } from "react"
import useSWR from "swr"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Input } from "../components/Input/Input"
import { LineChart } from "../components/LineChart"
import { PieChart } from "../components/PieChart"
import { RankChart } from "../components/RankChart"
import { TimeRange, TimeRangePicker } from "../components/TimeRangePicker"
import { TopNav } from "../components/TopNav"
import { useAjax } from "../lib/ajax"
import { time } from "../lib/time"


export const StatisticPage: React.FC = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
    const { get } = useAjax({ showLoading: false, handleError: true })
    const [kind, setKind] = useState('')
    const generateStartAndDefaultItems = () => {
        const defaultItems: { x: string; y: number }[] = []
        if (timeRange === 'thisMonth') {
            const startTime = time().firstDayOfMonth
            const start = startTime.format('yyyy-MM-dd')
            const endTime = time().lastDayOfMonth.add(1, 'day')
            const end = endTime.format('yyyy-MM-dd')
            for (let i = 0; i < startTime.dayCountOfMonth; i++) {
                const x = startTime.clone.add(i, 'day').format('yyyy-MM-dd')
                defaultItems.push({ x, y: 0 })
            }
            return { start, end, defaultItems }
        } else {
            return { start: '', end: '' }
        }
    }

    const { start, end, defaultItems } = generateStartAndDefaultItems()
    const { data: items } = useSWR(`/api/v1/items/summary?happened_after=${start}&happened_before=${end}&kind=${kind}&group_by='happen_at'`,
        async (path) => {
            const response = await get<{ groups: { happen_at: string; amount: number }[]; total: number }>(path)
            return response.data.groups
                .map(({ happen_at, amount }) => ({ x: happen_at, y: amount }))
        })
    const normalizedItems = defaultItems?.map((defaultItem) => {
        const item = items?.find((item) => item.x === defaultItem.x)
        if (item) {
            return item
        } else {
            return defaultItem
        }
    })
    console.log(normalizedItems)
    useEffect(() => {
        console.log(items)

    }, [items])

    const items2 = [
        { tag: { name: '吃饭', sign: '😊' }, amount: 10000 },
        { tag: { name: 'car', sign: 'xx' }, amount: 10800 },
        { tag: { name: 'food', sign: 'xxxxxx' }, amount: 50000 },
        { tag: { name: 'cloth', sign: 'ww' }, amount: 20000 },
        { tag: { name: 'masks', sign: 'qq' }, amount: 11000 },
    ].map(item => ({ x: item.tag.name, y: item.amount / 100 }))
    const item3 = [
        { tag: { name: '吃饭', sign: '😊' }, amount: 10000 },
        { tag: { name: 'car', sign: 'xx' }, amount: 10800 },
        { tag: { name: 'food', sign: 'xxxxxx' }, amount: 50000 },
        { tag: { name: 'cloth', sign: 'ww' }, amount: 20000 },
        { tag: { name: 'masks', sign: 'qq' }, amount: 11000 },
    ].map((item) => ({ name: item.tag.name, value: item.amount, sign: item.tag.sign }))
    return (
        <div>
            <Gradient>
                <TopNav title='统计图表' icon={
                    <Icon name='back' ></Icon>
                } />
            </Gradient>
            <TimeRangePicker selected={timeRange} onSelect={setTimeRange}
                timeRanges={[
                    { key: 'thisMonth', text: '本月' },
                    { key: 'lastMonth', text: '上月' },
                    { key: 'twoMonthsAgo', text: '两个月内' },
                    { key: 'threeMonthsAgo', text: '三个月内' },

                ]} />
            <div flex px-16px grow-0 shrink-0 items-center gap-x-16px p-16px>
                <span>类型</span>
                <div grow-1 shrink-1>
                    <Input type='select' options={[
                        { text: '支出', value: 'expenses' },
                        { text: '收入', value: 'income' }
                    ]} value={kind} onChange={value => setKind(value)} />
                </div>
            </div>
            <LineChart className={'h-200px  m-b-24px'} items={normalizedItems} />
            <PieChart className={'h-360px '} items={items2} />
            <RankChart className={'h-300px'} items={item3} />
        </div>
    )
}

