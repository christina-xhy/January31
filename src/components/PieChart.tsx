import { EChartsOption } from "echarts"
import * as echarts from 'echarts'
import { useEffect, useRef } from "react"
import { ItemKeys } from "@react-spring/web"

type Props = {
    className?: string
    items?: { name: string | number; value: number | string }[]
}


export const PieChart: React.FC<Props> = (props) => {
    const myChart = useRef<echarts.ECharts>()
    const { className, items = [] } = props
    const div = useRef<HTMLDivElement>(null)
    const initialized = useRef(false)
    useEffect(() => {
        if (!div.current) { return }
        if (initialized.current) { return }
        myChart.current = echarts.init(div.current)
        initialized.current = true
        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: 'item',
                formatter: ({ data: { name, value, sign } }: any) => {
                    return `${sign} ${name}: ${value}元`
                }
            },
            grid: {
                top: 0,
                left: 0,
                bottom: 10,
                right: 0,
            },
            legend: {
                orient: 'vertical',
                left: 'left',

            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '80%',
                    data: items.map((item, index) => ({ ...item, value: parseFloat(item.value.toString()) })),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.current.setOption(option);
    }, [])
    useEffect(() => {
        const option: echarts.EChartsOption = {
            series: [{ data: items, }]
        };
        myChart.current?.setOption(option);
    }, [items])
    return (
        <div className={className} ref={div} >PieChart </div>
    )
}