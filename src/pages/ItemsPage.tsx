import styled from "styled-components";
import { AddItemFloatButton } from "../components/AddItmeFloatButton";
import { TimeRangePicker } from "../components/TimeRangePicker";
import { Topnav } from "../components/Topnav";
import { useTitle } from "../hooks/useTitle";
import { ItemsList } from "./ItemsPages.tsx/ItemsList";
import { ItemsSummary } from "./ItemsPages.tsx/ItemsSummary";

interface Props{
    title?:string
}

const Div = styled.div`
background:linear-gradient(180deg, rgba(253,164,175,1) 0%, rgba(255,230,228,1) 100%,rgba(0,0,0,1) 100%);

`

export const ItemsPage : React.FC<Props> = (props) => {
    useTitle(props.title)
  return (
   <div>
     <Div>
       <Topnav />
       <TimeRangePicker />
     </Div>
       <ItemsSummary />
       <ItemsList />
       <AddItemFloatButton />
     
   </div>
  )
}