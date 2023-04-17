import useSWR from 'swr'
import { Money } from '../../components/Money'
import { useAjax } from '../../lib/ajax'
import { Time } from '../../lib/time'
type Props = {
  start: Time
  end: Time
}
export const ItemsSummary: React.FC<Props> = (props) => {
  const { start, end } = props
  const { get } = useAjax({ showLoading: false, handleError: false })
  const { data } = useSWR(start && end && `/api/v1/items/balance?happened_after=${start.isoString}&happened_before=${end.isoString}`, async (path) =>
    (await get<{ balance: number; expenses: number; income: number }>(path)).data)
  const { income, expenses, balance } = data ?? { income: 0, expense: 0, balance: 0 }
  return (
    <ol bg=' #44403c' flex justify-between items-center m-16px rounded-8px py-12px px-24px
      children-px-4px text-center>
      <li>
        <div text-red>收入</div>
        <div text-red><Money value={income} /></div>
      </li>
      <li>
        <div text-green>支出</div>
        <div text-green><Money value={expenses} /></div>
      </li>
      <li>
        <div text-white>净收入</div>
        <div text-white><Money value={balance} /></div>
      </li>
    </ol>
  )
}
