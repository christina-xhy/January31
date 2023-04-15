import { usePopup } from "../../hooks/usePopup"
import { time } from "../../lib/time"
import { DatePickers } from "../DatePickers"

type Props = {
    value?: string
    onChange?: (v: string) => void
    className?: string
    placeholder?: string
    type?: string
}

export const DateInput: React.FC<Props> = (props) => {
    const { value, onChange, className, placeholder, type } = props
    const { toggle, popup, hide } = usePopup({
        children: < DatePickers onConfirm={d => { onChange?.(time(d).format()); hide() }}
            onCancel={() => hide()} />, position: 'bottom'
    })

    return (
        <>
            {popup}
            <input className={className} j-input-text rounded-8px type={type} placeholder={placeholder}
                readOnly={true} value={value} onClick={toggle} />
        </>

    )
}