type Props = {
    value?: number
}
export const Money: React.FC<Props> = (props) => {
    const { value = 0 } = props
    return (
        <div>¥ {`${(value / 100).toFixed(2)}`} </div>
    )
}