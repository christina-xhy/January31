// import type { ReactNode } from 'react'
// import c from 'classnames'
// import s from './Tabs.module.scss'
// type Props<T> = {
//   tabItems: {
//     key: T
//     text: string
//     element: ReactNode
//   }[]
//   value: T
//   onChange: (key: T) => void
//   className: string
//   classPrefix?: string
// }
// export const Tabs = <T extends string>(props: Props<T>) => {
//   const { tabItems, value, onChange, className, classPrefix } = props
//   return (
//    <div className = {c(className, classPrefix)}>
//      <ol flex text-white children-px-24px children-py-12px bg='[rgb(248, 213, 210)]'
//      className={classPrefix ? `${classPrefix}-menu` : '' }>
//       {tabItems.map(item => <li key={item.key} className={
//         c(
//           item.key === value ? s.selected : '',
//           classPrefix ? `${classPrefix}-menu-item` : ''
//         )
//       }
//         onClick={() => onChange(item.key)}>
//         {item.text}
//       </li>)}
//      </ol>
//      <div className={ classPrefix ? `${classPrefix}-pane` : ''}>
//         {tabItems.filter(item => item.key === value)[0].element}
//      </div>
//    </div>
//   )
// }
import type { ReactNode } from 'react'
import React from 'react'
import cs from 'classnames'
import s from './Tabs.module.scss'
type Props<T> = {
  tabItems: {
    key: T
    text: string
    element?: ReactNode
  }[]
  value: T
  onChange: (key: T) => void
  className?: string
  classPrefix?: string
}

export const Tabs = <T extends string>(props: Props<T>) => {
  const { tabItems, value, onChange, className, classPrefix } = props
  return (
    <div className={cs(className, classPrefix)} flex flex-col>
      <ol flex text-white children-px-24px children-py-12px bg="[rgb(255,230,228)]"
        grow-0 shrink-0 className={classPrefix ? `${classPrefix}-menu` : ''}>
        {tabItems.map(item =>
          <li key={item.key} className={
            cs(
              item.key === value ? s.selected : '',
              classPrefix ? `${classPrefix}-menu-item` : ''
            )
          }
            onClick={() => onChange(item.key)}>
            {item.text}
          </li>)}
      </ol>
      <div grow-1 shrink-1 overflow-auto className={classPrefix ? `${classPrefix}-pane` : ''}>
        {tabItems.filter(item => item.key === value)[0].element}
      </div>
    </div>
  )
}
