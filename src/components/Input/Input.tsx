
import { ReactNode, useState } from 'react'
import { render } from 'react-dom'
import { EmojiInput } from './emojiInput'

type Props = {
    label: string | ReactNode
    placeholder?: string
    type?: 'text' | 'emoji' | 'sms_code'
    value?: string
    onChange?: (value: string) => void
    error?: string
}

export const Input: React.FC<Props> = (props) => {
    const { label, placeholder, value, onChange, type = 'text', error } = props
    const renderInput = () => {
        {
            switch (type) {
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
                default:
                    return null
            }
        }
    }
    return (
        <>
            <div flex flex-col gap-y-8px>
                <span j-form-label >{label}</span>
                {renderInput()}
            </div>
            <span text-red text-12px>{error || ' '}</span>
        </>
    )
}