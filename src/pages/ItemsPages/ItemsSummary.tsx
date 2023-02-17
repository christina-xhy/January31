export const ItemsSummary: React.FC = () => {
  return (
    <ol bg=' #44403c' flex justify-between items-center m-16px rounded-8px py-12px px-16px
      children-px-24px>
      <li>
        <div text-red>收入</div>
        <div text-red>1000</div>
      </li>
      <li>
        <div text-green>支出</div>
        <div text-green>1000</div>
      </li>
      <li>
        <div text-white>净收入</div>
        <div text-white>1000</div>
      </li>
    </ol>
  ) }
