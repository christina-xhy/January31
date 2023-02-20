import c from 'classnames'
// import s from './Icon.module.scss'

interface Props {
  name: string
  className?: string
  onClick?: () => void
}
export const Icon: React.FC<Props> = ({ name, className, onClick }) => {
  return (
    <svg className={c(className, 'icon')} onClick = {onClick} >
    <use xlinkHref={`#${name}`}></use>
  </svg>
  )
}
