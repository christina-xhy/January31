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
import { Time, time } from "../lib/time"
type Groups = { happen_at: string; amount: number }[]
type Groups2 = { tag_id: string; tag: Tag; amount: number }[]
export const StatisticPage: React.FC = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
    const { get } = useAjax({ showLoading: false, handleError: true })
    const [kind, setKind] = useState('')
    const generateStartAndEnd = () => {
        if (timeRange === 'thisMonth') {
            const start = time().firstDayOfMonth
            const end = time().lastDayOfMonth.add(1, 'day')
            return { start, end }
        } else {
            return { start: time(), end: time() }
        }
    }
    //生成一个变亮，创建空的数据
    const generateDefaultItems = (time: Time) => {
        return Array.from({ length: start.dayCountOfMonth }).map((_, index) => {
            const x = start.clone.add(index, 'day').format('yyyy-MM-dd')
            return { x, y: 0 }
        })
    }
    const { start, end } = generateStartAndEnd()

    const defaultItems = generateDefaultItems(start)
    const { data: items } = useSWR(`/api/v1/items/summary?happened_after=${start}&happened_before=${end}&kind=${kind}&group_by=happen_at`,
        async (path) => {
            const response = await get<{ groups: Groups; total: number }>(path)
            return response.data.groups
                .map(({ happen_at, amount }) => ({ x: happen_at, y: (amount / 100).toFixed(2) }))
        })
    const normalizedItems = defaultItems?.map((defaultItem) => {
        const item = items?.find((item) => item.x === defaultItem.x)
        if (item) {
            return item
        } else {
            return defaultItem
        }
    })
    useEffect(() => { }, [items])

    const { data: data2 } = useSWR(`/api/v1/items/summary?happened_after=${start}&happened_before=${end}&kind=${kind}&group_by=tag_id`,
        async (path) =>
            (await get<{ groups: Groups2; total: number }>(path)).data
    )
    const { groups: groups2, total: total2 } = data2 ?? {}
    const items2 = groups2?.map((item) => {
        return { name: item.tag.name, value: (item.amount / 100).toFixed(2), sign: item.tag.sign }
    })
    console.log(items2)

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
            <RankChart className={'h-300px'} items={items2} />
        </div>
    )
}

