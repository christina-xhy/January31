import { useRef } from "react";
import { Money } from "./Money";

type Props = {
    className?: string
    items?: { name: string; value: number; sign: string }[]
}

export const RankChart: React.FC<Props> = (props) => {
    const { className, items } = props
    const div = useRef<HTMLDivElement>(null)
    const total = items?.reduce((result, item) => result + item.value, 0) ?? 0
    const max = items?.reduce((pre, item) => Math.max(pre, item.value), 0) ?? 0
    const colors = ['#5470c6', '#ffbab0', '#ffa750', '#8748d3', '#53a867', '#eba953', '#91cc75', '#fac858', '#ee6666', '#73c0de']
    const renderItems = () => {
        return (
            <div >
                {items?.map((item, index) => <div key={item.name} b-1 b-red grid grid-cols='[48px_1fr_1fr]'
                    text-14px grid-rows='[repeat,1fr)]' items-center my-16px px-16px gap-x-8px gap-y-6px>

                    <div row-start-1 col-start-1 row-end-3 col-end-2 bg='#eee' w-48px h-48px rounded-24px
                        flex items-center justify-center text-24px >{item.sign}</div>
                    <div row-start-1 col-start-2 row-end-2 col-end-3 self-end >
                        {item.name}-{`${(max / total * 100).toFixed(0)}%`}</div>
                    <div row-start-1 col-start-3 row-end-2 col-end-4 text-right self-end>
                        <Money value={item.value} />
                    </div>
                    <div row-start-2 col-start-2 row-end-3 col-end-4 self-start h-8px rounded-4px
                        bg="#eee" relative overflow-hidden>
                        <div absolute rounded-4px h='100%'
                            style={{ background: colors[index], width: `${item.value / max * 100}%` }} />
                    </div>
                </div>)
                }
            </div >
        )
    }

    return (
        <div ref={div} className={className}>
            {
                items
                    ? renderItems()
                    : <div>暂无数据</div>
            }

        </div>
    )
}