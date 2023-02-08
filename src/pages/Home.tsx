import { useLocalStore } from "../stores/useLocalStore";
import pig from '../assets/images/pig.svg'
import add from '../assets/images/add.svg'
import useSWR from 'swr'
import { ajax } from "../lib/ajax";
import { Navigate } from "react-router-dom";

export const Home : React.FC = () => {
   const {data: meData,error: meError} = useSWR('/api/v1/me',async path => 
    (await ajax.get<Resource<User>>(path)).data.resource
   )
   const {data: itemsData,error: itemsError} = useSWR(meData ? '/api/v1/items' : null,async path => 
    (await ajax.get<Resources<Item>>(path)).data
   )
   // dev 访问本地mock服务器，build 访问真实的远程服务器
   console.log(meData,meError,itemsData,itemsError)
   const isLoadingMe = !meData && !meError
   const isLoadingItems = meData && !meData && !meError
   if (isLoadingMe){
    return <div>加载ing...</div>
   }
   //判断用户是否记过账
   if(itemsData?.resources[0]){
    return <Navigate to = '/items' />
   }

  return (
    <div>
      <div flex justify-center items-center>
        <img mt-20vh mb-20vh width= '98' height= '100' src={pig}/>
      </div>
      <div px-16px>
        <button h-48px w='100%' bg='#5C33BE' text-white b-none
        rounded-8px
        >开始记账</button>
      </div>
      <button w-56px h-56px bg="#5C33BE"  text-white rounded-50px 
        text-6xl  fixed bottom-16px right-16px>
        <img src={add} max-w = "100%" max-h="100%" />
      </button>
    </div>
  )
}