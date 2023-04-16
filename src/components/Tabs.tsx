import type { ReactNode } from 'react'
import c from 'classnames'
import s from './Tabs.module.scss'
import { compare } from 'swr/_internal'
type Props<T> = {
  tabItems: {
    key: T
    text: string
    element?: ReactNode
  }[]
  //element是Node节点，也就是DOM元素，select -- <option/>
  value: T
  onChange: (key: T) => void
  className?: string
  classPrefix?: string
}
//比较对象key和value对象的属性是否相等
const compareKey = <T extends (string | { name: string })>(a: T, c: T) => {
  if (typeof a === 'string' && typeof c === 'string') {
    return a === c
  } else if (a instanceof Object && c instanceof Object) {
    return a.name === c.name
  } else {
    return false
  }
}

export const Tabs = <T extends string | { name: string }>(props: Props<T>) => {
  const { tabItems, value, onChange, className, classPrefix } = props
  return (
    <div className={c(className, classPrefix)} flex flex-col>
      {/* 设置ol的classPrefix，有可能是不同组件的ol */}
      <ol flex text-black children-px-24px children-py-12px bg="[rgb(255,230,228)]"
        grow-0 shrink-0 className={classPrefix ? `${classPrefix}-menu` : ''}>
        {tabItems.map(item =>
          <li key={typeof item.key === 'string' ? item.key : item.key.name} className={
            c(
              compareKey(item.key, value) ? s.selected : '',
              classPrefix ? `${classPrefix}-menu-item` : ''
            )
          }
            onClick={() => onChange(item.key)}>
            {item.text}
          </li>)}
      </ol>
      <div grow-1 shrink-1 overflow-auto className={classPrefix ? `${classPrefix}-pane` : ''}>
        {tabItems.filter(item => compareKey(item.key, value))[0]?.element}
        {/*  */}
        {/* {tabItems[0].element} */}

      </div>
    </div>
  )
}
