import { time } from '../../lib/time'
import { DatePickers } from "../../components/DatePickers";
import { Icon } from "../../components/Icon"
import { usePopup } from "../../hooks/usePopup";
type Props = {
    value?: string | Date
    onChange: (date: string) => void
}
export const ItemDate: React.FC<Props> = (props) => {
    const { value, onChange } = props
    const { toggle, popup, hide } = usePopup({
        children: < DatePickers onConfirm={d => { onChange(time(d).isoString);hide() }}
            onCancel={() => hide()} />,
        position: 'bottom'
    })
    return (
        <>
            {popup}
            <div flex gap-x-8px items-center >
                <Icon className='shrink-0 grow-0 w-24px h-24px' name='date' onClick={toggle} />
                <span>{time(value).format()}</span>
            </div>
        </>


    )
}

