import { useEffect, useRef, useState } from "react"


type Props = {
    value?: string
    placeholder?: string
    onChange?: (value: string) => void
    onClick?: () => void
    request?: () => Promise<unknown>
} & (
        | { type: 'text' }
        | { type: 'emoji' }
        | { type: 'sms_code'; request: () => Promise<unknown> }
        | { type: 'select', options: { value: string; text: string }[] }
    )
const maxCount = 30
export const SmsCodeInput: React.FC<Props> = (props) => {
    const { value, placeholder, onChange, request, type } = props
    const [count, setCount] = useState(maxCount)
    const [start, setStart] = useState<Date>()
    const timer = useRef<number>()
    const onClick = async () => {
        if (!request) { return }
        await request()
        setStart(new Date())
    }
    useEffect(() => {
        const clearTimer = () => {
            window.clearInterval(timer.current)
            timer.current = undefined
        }
        if (!start) {
            clearTimer()
            return
        } else {
            timer.current = window.setInterval(() => {
                const seconds = Math.round((new Date().getTime() - start.getTime()) / 1000)
                const TimerCounts = maxCount - seconds
                if (TimerCounts <= 0) {
                    setStart(undefined)
                }
                setCount(TimerCounts)
            }, 1000)
        }
        return () => {
            if (timer.current) {
                clearTimer()
            }
        }
    }, [start, count])
    return (
        <div>
            <div flex gap-x-6px>
                <input shrink-1 max-w='[calc(40%-8px)]' j-input-text type={type} rounded-8px placeholder={placeholder}
                    value={value} onChange={e => onChange?.(e.target.value)} />
                {start
                    ? <button type='button' max-w='[calc(60%-8px)]' shrink-0 j-btn ml-16px onClick={onClick}>{count}</button>
                    : <button type='button' max-w='[calc(60%-8px)]' shrink-0 j-btn ml-16px onClick={onClick}>发送验证码</button>
                }
            </div>
        </div>
    )
}
