
import { ReactNode } from 'react'
import { SmsCodeInput } from '../SmsCodeInput'
import { DateInput } from './DataInput'
import { EmojiInput } from './emojiInput'

type Props<T> = {
    label?: string | ReactNode
    placeholder?: string
    value?: T
    onChange?: (value: T) => void
    error?: string
    disableError?: boolean
    className?: string

} & (
        | { type?: 'text' }
        | { type: 'emoji' }
        | { type: 'date' }
        | { type: 'sms_code'; request?: () => Promise<unknown> }
        | { type: 'select', options: { value: string; text: string }[] }
    )


export const Input = <T extends string>(props: Props<T>) => {
    const { label, placeholder, value, onChange, type, error, disableError, className } = props
    const renderInput = () => {
        {
            switch (props.type) {
                case undefined:
                case 'text':
                    return <input j-input-text rounded-8px type={type} placeholder={placeholder}
                        value={value} onChange={e => onChange?.(e.target.value as T)} />
                case 'emoji':
                    return <EmojiInput value={value} onChange={value => onChange?.(value as T)} />
                case 'sms_code':
                    return <SmsCodeInput value={value} type='text' onChange={value => onChange?.(value as T)} placeholder={placeholder}
                        request={props.request} />
                case 'select':
                    return <select rounded-6px className={'h-36px'} value={value} onChange={e => onChange?.(e.target.value as T)}>
                        {props.options.map((option) => {
                            return <option key={option.value} value={option.value}>{option.text}</option>
                        })}
                    </select>
                case 'date':
                    return <DateInput value={value} onChange={value => onChange?.(value as T)} placeholder={placeholder} type={type} />
                default:
                    return null
            }
        }
    }
    return (
        <>
            <div flex flex-col gap-y-8px className={className}>
                {label ? <span j-form-label >{label}</span> : null}
                {renderInput()}
            </div>
            {disableError ? null : <span text-red text-12px>{error || ' '}</span>}
        </>
    )
}