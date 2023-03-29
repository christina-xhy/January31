import { useState } from "react"
import { AddItemFloatButton } from "../components/AddItmeFloatButton"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { LineChart } from "../components/LineChart"
import { PieChart } from "../components/PieChart"
import { RankChart } from "../components/RankChart"
import { TimeRange, TimeRangePicker } from "../components/TimeRangePicker"
import { TopNav } from "../components/TopNav"


export const StatisticPage: React.FC = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
    const items = [
        { date: '20223-01-01', value: 100000 },
        { date: '20223-01-03', value: 300000 },
        { date: '20223-01-05', value: 400000 },
        { date: '20223-01-05', value: 20000 },
        { date: '20223-01-10', value: 400000 },
        { date: '20223-01-15', value: 80000 },
        { date: '20223-01-25', value: 450000 },
        { date: '20223-02-18', value: 900000 },
    ].map(item => ({ x: item.date, y: item.value / 100 }))
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
            <TimeRangePicker selected={timeRange} onSelect={setTimeRange} />
            <AddItemFloatButton />
            <LineChart className={'h-200px  m-b-24px'} items={items} />
            <PieChart className={'h-360px '} items={items2} />
            <RankChart className={'h-300px'} items={item3} />
        </div>
    )
}

