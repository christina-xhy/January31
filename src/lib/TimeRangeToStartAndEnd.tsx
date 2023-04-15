
import { TimeRange } from "../components/TimeRangePicker"
import { Time, time } from "./time"

const timeRangeMap: { [k in TimeRange]: number } = {
    thisYear: 0,
    custom: 0,
    thisMonth: 0,
    lastMonth: -1,
    twoMonthsAgo: -2,
    threeMonthsAgo: -3,
}

export const TimeRangeToStartAndEnd = (timeRange: TimeRange) => {
    let selected: Time, start: Time, end: Time
    switch (timeRange) {
        case 'thisMonth':
        case 'lastMonth':
        case 'twoMonthsAgo':
        case 'threeMonthsAgo':
            selected = time().add(timeRangeMap[timeRange], 'month')
            start = selected.firstDayOfMonth
            end = start.lastDayOfMonth.add(1, 'day')
            return { start, end }
        case 'thisYear':
            start = time().set({ month: 1 }).firstDayOfMonth
            end = time().add(1, 'year').set({ month: 1 }).firstDayOfMonth
            return { start, end }
        case 'custom': 
        return{ start: time(), end: time()}
    }
}
//生成一个变量，创建空的数据
