type Props = {
    value?: number
}
export const Money: React.FC<Props> = (props) => {
    const { value = 0 } = props
    return (
        <div flex-nowrap><span text-15px flex-nowrap display-inline>¥{`${(value / 100).toFixed(2)}`}</span></div >
    )
}