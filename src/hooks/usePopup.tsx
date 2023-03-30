import type { ReactNode } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { Popup } from '../components/Popup'
import { rootDiv } from '../main'

type Props = {
  initVisible?: boolean
  children?: ReactNode
  position?: 'bottom' | 'center'
}
export const usePopup = (initVisible = false, children: ReactNode, position: 'bottom' | 'center') => {
  const [visible, setVisible] = useState(initVisible)
  const popup = ReactDOM.createPortal(<Popup position={position} visible={visible} onClickMask={() => setVisible(false)} >
    {children}
  </Popup>, rootDiv)
  return {
    popup,
    show() {
      setVisible(true)
    },
    hide() {
      setVisible(false)
    },
    toggle() {
      setVisible(!visible)
    }
  }
}