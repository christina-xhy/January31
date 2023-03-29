import { EChartsOption } from "echarts"
import * as echarts from 'echarts'
import { useEffect, useRef } from "react"
import { ItemKeys } from "@react-spring/web"

type Props = {
    className?: string
    items?: { x: string | number; y: number }[]
}


export const PieChart: React.FC<Props> = (props) => {
    const { className, items } = props
    const div = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!div.current) { return }
        const myChart = echarts.init(div.current)
        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: 'item'
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
                    data: items?.map(item => ({ value: item.y, name: item.x })),
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
        myChart.setOption(option);
    }, [])
    return (
        <div className={className} ref={div} >PieChart </div>
    )
}