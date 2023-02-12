import { useContext } from "react"
import { menuContext } from "../pages/ItemsPage"
import { Icon } from "./Icon"

interface Props{
  title?:string
}
export const TopNav : React.FC <Props>= ({title = 'ali记账'}) => {
  const {visible,setVisible} = useContext(menuContext)
  return (
    <div text-white flex items-center pt-24px py-8px px-24px >
      <Icon name='menu' className='w-24px h-24px mr-16px'
        onClick={()=>{
          setVisible(!visible)
        }}
      />
      <h1 text-24px>{title}</h1>
    </div>
  )
}