import { useState } from "react";
import styled from "styled-components";
import { AddItemFloatButton } from "../components/AddItmeFloatButton";
import { TimeRange, TimeRangePicker } from "../components/TimeRangePicker";
import { Topnav } from "../components/Topnav";
import { useTitle } from "../hooks/useTitle";
import { ItemsList } from "./ItemsPages/ItemsList";
import { ItemsSummary } from "./ItemsPages/ItemsSummary";



interface Props{
    title?:string
} 
const Div = styled.div`
  background:linear-gradient(20deg, rgba(253,164,175,1) 0%, rgba(255,230,228,1) 100%,
  rgba(0,0,0,1) 100%);
`

export const ItemsPage : React.FC<Props> = (props) => {
    useTitle(props.title)
    const [timeRange,setTimeRange] = useState<TimeRange>('thisMonth')
    const [items] = useState<Item[]>([
      {
        id: 1,
        amount: 1000,
        note: 'string',
        tag_ids: [1],
        happen_at: '2023-02-11T00:00.000Z',
        created_at: '2023-02-11T00:00.000Z',
        updated_at: '2023-02-1T00:00.000Z',
        kind: 'incomes',
        user_id: 1
      },
      {
        id: 2,
        amount: 1000,
        note: 'string',
        tag_ids: [2],
        happen_at: '2023-02-11T00:00.000Z',
        created_at: '2023-02-11T00:00.000Z',
        updated_at: '2023-02-11T00:00.000Z',
        kind: 'incomes',
        user_id: 2
      },
      {
        id: 3,
        amount: 1000,
        note: 'string',
        tag_ids: [3],
        happen_at: '2023-02-11T00:00.000Z',
        created_at: '2023-02-11T00:00.000Z',
        updated_at: '2023-02-11T00:00.000Z',
        kind: 'incomes',
        user_id: 3
      }
    ])
  return (
   <div>
     <Div>
       <Topnav />
       <TimeRangePicker  selected = {timeRange} onSelected={setTimeRange} />
     </Div>
       <ItemsSummary />
       <ItemsList items={items}/>
       <AddItemFloatButton />
   </div>
  )
}
