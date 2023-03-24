import { DatePicker } from 'antd-mobile'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Icon } from '../../components/Icon'
interface Props {
  className: string
}
export const DateAndAmount: React.FC<Props> = (props) => {
  const { className } = props
  const [createdAt, setCreatedAt] = useState(new Date())
  const [visible, setVisible] = useState<boolean>(false)
  // const onChange = (value: object) => {
  //   setCreatedAt(value)
  // }
  return (
    <div className={className}>
      <div flex p-t-15px p-b-16px px-16px border-t-1px border-t='#ddd' >
        <span flex gap-x-8px items-center >
          <Icon className='shrink-0 grow-0 w-24px h-24px' name='date' />
          <span grow-0 shrink-0 text-12px >
            <DatePicker visible={visible}
              onClose={() => { setVisible(false) }}
            // onConfirm={(value) => { onChange({ createdAt: value }) }}
            />
            <div onClick={() => { setVisible(true) }}>
              <div>{dayjs(createdAt).format('YYYY-MM-DD')}</div>
            </div>
          </span>
        </span>
        <code grow-1 items-center shrink-1 text-right color='pink' >22223344444.766</code>
      </div>
      <div py-1px grid grid-cols='[repeat(4,1fr)]' grid-rows='[repeat(4,48px)]'
        children-b-none children-bg-white gap-x-1px gap-y-1px bg='#ddd'>
        <button row-start-1 col-start-2 row-end-2 col-end-3>2</button>
        <button row-start-1 col-start-3 row-end-2 col-end-4>3</button>
        <button row-start-2 col-start-1 row-end-3 col-end-2>4</button>
        <button row-start-1 col-start-1 row-end-2 col-end-2>1</button>
        <button row-start-2 col-start-2 row-end-3 col-end-3>5</button>
        <button row-start-2 col-start-3 row-end-3 col-end-4>6</button>
        <button row-start-3 col-start-1 row-end-4 col-end-2>7</button>
        <button row-start-3 col-start-2 row-end-4 col-end-3>8</button>
        <button row-start-3 col-start-3 row-end-4 col-end-4>9</button>
        <button row-start-4 col-start-1 row-end-5 col-end-3>0</button>
        <button row-start-4 col-start-3 row-end-5 col-end-4>.</button>
        <button row-start-1 col-start-4 row-end-3 col-end-5>清空</button>
        <button row-start-3 col-start-4 row-end-5 col-end-5>提交</button>
      </div>
    </div>
  )
}
