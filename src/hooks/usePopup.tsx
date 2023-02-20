import { useState } from 'react'
import ReactDOM from 'react-dom'
import { Popup } from '../components/Popup'

export const usePopup = () => {
  const [visible, setVisible] = useState(false)
  const popup = ReactDOM.createPortal(<Popup visible={visible} onClickMask={() => setVisible(false)}/>,
    document.body)
  return (
    {
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
  )
}

