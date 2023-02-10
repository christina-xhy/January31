import c from 'classnames'
// import s from './Icon.module.scss'

interface Props{
  name:string
  className?:string
}
export const Icon : React.FC<Props> = ({name,className}) => {
  return (
    <svg className={c(className,'icon')} >
    <use xlinkHref={`#${name}`}></use>
  </svg>
  )
}