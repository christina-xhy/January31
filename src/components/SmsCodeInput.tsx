type Props = {
    value?: string
    placeholder?: string
    onChange?: (value: string) => void
    onClick?: () => void
} & (
        | { type: 'text' }
        | { type: 'emoji' }
        | { type: 'sms_code'; onClick: () => void }
        | { type: 'select', options: { value: string; text: string }[] }
    )

export const SmsCodeInput: React.FC<Props> = (props) => {
    const { value, placeholder, onChange, onClick, type } = props
    return (
        <div>
            <div flex gap-x-6px>
                <input shrink-1 max-w='[calc(40%-8px)]' j-input-text type={type} rounded-8px placeholder={placeholder}
                    value={value} onChange={e => onChange?.(e.target.value)} />
                <button type='button' max-w='[calc(60%-8px)]' shrink-0 j-btn ml-16px onClick={onClick}>发送验证码</button>
            </div>
        </div>
    )
}