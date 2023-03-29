
import { ReactNode, useState } from 'react'
import { EmojiInput } from './emojiInput'

type Props = {
    label?: string | ReactNode
    placeholder?: string
    | 'emoji' | 'sms_code' | 'select'
    value?: string
    onChange?: (value: string) => void
    error?: string
    disableError?: boolean
} & (
        | { type: 'text' }
        | { type: 'emoji' }
        | { type: 'sms_code' }
        | { type: 'select', options: { value: string; text: string }[] }
    )


export const Input: React.FC<Props> = (props) => {
    const { label, placeholder, value, onChange, type, error, disableError } = props
    const renderInput = () => {
        {
            switch (props.type) {
                case undefined:
                case 'text':
                    return <input j-input-text rounded-8px type={type} placeholder={placeholder}
                        value={value} onChange={e => onChange?.(e.target.value)} />
                case 'emoji':
                    return <EmojiInput value={value} onChange={value => onChange?.(value)} />
                case 'sms_code':
                    return <div flex gap-x-16px>
                        <input shrink-1 max-w='[calc(40%-8px)]' j-input-text rounded-8px type={type} placeholder={placeholder}
                            value={value} onChange={e => onChange?.(e.target.value)} />
                        <button max-w='[calc(60%-8px)]' shrink-0 j-btn ml-16px>发送验证码</button>
                    </div>
                case 'select':
                    return <select rounded-6px className={'h-36px'} value={value} onChange={e => onChange?.(e.target.value)}>
                        {props.options.map((option) => {
                            return <option key={option.value} value={option.value}>{option.text}</option>
                        })}
                    </select>
                default:
                    return null
            }
        }
    }
    return (
        <>
            <div flex flex-col gap-y-8px>
                {label ? <span j-form-label >{label}</span> : null}
                {renderInput()}
            </div>
            {disableError ? null : <span text-red text-12px>{error || ' '}</span>}
        </>
    )
}