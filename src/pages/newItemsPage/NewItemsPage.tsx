import { ReactNode, useState } from 'react'
import { Gradient } from '../../components/Gradient'
import { Tabs } from '../../components/Tabs'
import { TopNav } from '../../components/TopNav'
import s from './NewItemsPage.module.scss'
import { ItemAmount } from './ItemAmount'
import { Tags } from './Tags'
import { useCreateItemStore } from '../../stores/useCreateItemStore'
import { ItemDate } from './ItemDate'
import { hasError, validate } from '../../lib/validate'
import { useAjax } from '../../lib/ajax'
import { BackIcon } from '../../components/BackIcon'
import { useNavigate } from 'react-router-dom'
import { time } from '../../lib/time'
import { DatePicker } from 'antd-mobile'
import { Icon } from '../../components/Icon'
import dayjs from 'dayjs'

// type Props = {
//   dateValue?: string
//   dateChange?: (time: string) => void
// }
export const NewItemsPage: React.FC = () => {
  // const { dateValue, dateChange } = props
  const { data, setData, setError } = useCreateItemStore()
  const tabItems: { key: Item['kind']; text: string; element?: ReactNode }[] = [
    {
      key: 'expenses',
      text: '支出',
      element: <Tags kind='expenses' value={data.tag_ids} onChange={ids => setData(({ tag_ids: ids }))} />
    },
    { key: 'income', text: '收入', element: <Tags kind='income' value={data.tag_ids} onChange={ids => setData(({ tag_ids: ids }))} /> },
  ]

  const { post } = useAjax({ showLoading: true, handleError: true })
  const nav = useNavigate()
  // const [createdAt, setCreatedAt] = useState<any>(new Date())
  // const [visible, setVisible] = useState<boolean>(false)
  // const chooseChange = (date: string) => {
  //   dateChange?.(time(date).isoString)
  // }
  const onSubmit = async () => {
    const error = validate(data, [
      { key: 'kind', type: 'required', message: '请选择类型：收入或支出' },
      { key: 'tag_ids', type: 'required', message: '请选择一个标签' },
      { key: 'happen_at', type: 'required', message: '请选择一个时间' },
      { key: 'amount', type: 'required', message: '请输入金额' },
      { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为0' }
    ])
    setError(error)
    if (hasError(error)) {
      const message = Object.values(error).flat().join('\n')
      window.alert(message)
    } else {
      await post<Resource<Item>>('/api/v1/items', data)
      setData({ happen_at: time().isoString, amount: 0, tag_ids: [] })
      nav('/items')
    }
  }


  return (
    <div className={s.wrapper} h-screen flex flex-col >
      <Gradient className='grow-0 shrink-0'>
        <TopNav title='记一笔' icon={<BackIcon />} />
      </Gradient>
      <Tabs className='children-flex-1 flex-1 text-center grow-1 shrink-1 overflow-hidden'
        tabItems={tabItems} classPrefix='itemsNewPage'
        value={data.kind!} onChange={(item) => { setData({ kind: item }) }} />
      {/* <span flex gap-x-8px items-center >
        <Icon className='shrink-0 grow-0 w-24px h-24px' name='date' />
        <span grow-0 shrink-0 text-12px >
          <DatePicker visible={visible}
            onClose={() => { setVisible(false) }}
            onConfirm={(newDate) => { chooseChange(newDate.toString()) }}
          />
          <div onClick={() => { setVisible(true) }}>
            <div>{dayjs(dateValue).format('YYYY-MM-DD')}</div>
          </div>
        </span>
      </span> */}
      <ItemAmount className='grow-0 shrink-0' dateValue={data.happen_at} dateChange={(happen_at) => setData({ happen_at })}
        itemDate={<ItemDate value={data.happen_at} onChange={(happen_at) => setData({ happen_at })} />}
        value={data.amount} onChange={amount => setData({ amount })} onSubmit={onSubmit} />
    </div>
  )
}
