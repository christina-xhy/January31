
import { useEffect, useState } from "react"
import useSWR from "swr"
import { BackIcon } from "../components/BackIcon"
import { Gradient } from "../components/Gradient"
import { Input } from "../components/Input/Input"
import { LineChart } from "../components/LineChart"
import { PieChart } from "../components/PieChart"
import { RankChart } from "../components/RankChart"
import { TimeRange, TimeRangePicker } from "../components/TimeRangePicker"
import { TopNav } from "../components/TopNav"
import { useAjax } from "../lib/ajax"
import { Time, time } from "../lib/time"
import { TimeRangeToStartAndEnd } from "../lib/TimeRangeToStartAndEnd"
type Groups = { happen_at: string; amount: number }[]
type Groups2 = { tag_id: string; tag: Tag; amount: number }[]

type getKeyParams = {
    start: Time
    end: Time
    kind: Item['kind']
    group_by: 'happen_at' | 'tag_id'
}
const getKey = ({ start, end, kind, group_by }: getKeyParams) => {
    return `/api/v1/items/summary?happened_after=${start.format('yyyy-MM-dd')}&happened_before=${end.format('yyyy-MM-dd')}&kind=${kind}&group_by=${group_by}`
}


export const StatisticPage: React.FC = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>({
        name: 'thisMonth',
        start: time().firstDayOfMonth,
        end: time().lastDayOfMonth.add(1, 'day')
    })
    const { get } = useAjax({ showLoading: false, handleError: true })
    const [kind, setKind] = useState<Item['kind']>('expenses')


    const generateDefaultItems = (time: Time) => {
        return Array.from({ length: start.dayCountOfMonth }).map((_, index) => {
            const x = start.clone.add(index, 'day').format('yyyy-MM-dd')
            return { x, y: 0 }
        })
    }
    const { start, end } = timeRange

    const defaultItems = generateDefaultItems(start)
    const { data: items } = useSWR(getKey({ start, end, kind, group_by: 'happen_at' }),
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

    const { data: data2 } = useSWR(getKey({ start, end, kind, group_by: 'tag_id' }),
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
                    <BackIcon />
                } />
            </Gradient>
            <TimeRangePicker selected={timeRange} onSelect={setTimeRange}
                //自定义timeRanges属性的内容，设置默认值
                timeRanges={[
                    {
                        text: '本月',
                        key: { name: 'thisMonth', start: time().firstDayOfMonth, end: time().lastDayOfMonth.add(1, 'day') },
                    },
                    {
                        text: '上月',
                        key: { name: 'lastMonth', start: time().add(-1, 'month').firstDayOfMonth, end: time().add(-1, 'month').lastDayOfMonth.add(1, 'day') },
                    },
                    {
                        text: '前两个月',
                        key: { name: 'twoMonthsAgo', start: time().add(-2, 'month').firstDayOfMonth, end: time().add(-2, 'month').lastDayOfMonth.add(1, 'day') },
                    },
                    {
                        text: '前三个月',
                        key: { name: 'threeMonthsAgo', start: time().add(-3, 'month').firstDayOfMonth, end: time().add(-3, 'month').lastDayOfMonth.add(1, 'day') },
                    },

                ]} />
            <div flex px-16px grow-0 shrink-0 items-center gap-x-16px p-16px>
                <span>类型</span>
                <div grow-1 shrink-1>
                    <Input type='select' options={[
                        { text: '支出', value: 'expenses' },
                        { text: '收入', value: 'income' }
                    ]} value={kind} onChange={value => setKind(value)} disableError />
                </div>
            </div>
            <LineChart className={'h-200px  m-b-24px'} items={normalizedItems} />
            <PieChart className={'h-360px '} items={items2} />
            <RankChart className={'h-300px'} items={items2} />
        </div>
    )
}

