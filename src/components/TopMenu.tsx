import React from "react"
import { CurrentUser } from "./TopMenu/CurrentUser"
import { Menu } from "./TopMenu/Menu"

interface Props{
  onClickMask?: () => void 
}
export const TopMeue : React.FC<Props> = ( props ) => {
  const { onClickMask } = props
  return (
    <React.Fragment>
      <div fixed top-0 left-0 w='100%' h='100%' bg='[rgba(0,0,0,0.75)]'
      z='[calc(var(--z-menu)-1)]' onClick={onClickMask}></div>
      
      <div fixed top-0 left-0 w='70vw'max-w-20em h-screen  flex flex-col z='[var(--z-menu)]'> 
        <CurrentUser className='grow-1 shrink-0'/>
        <Menu className='grow-1 shrink-1'/>
      </div> 
    </React.Fragment>
  )
}