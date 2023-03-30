import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"
import './global.scss'
import 'virtual:uno.css'
import './app.scss'
import 'virtual:svgsprites'
import vhCheck from 'vh-check'
import styled from "styled-components"
import { Icon } from "./components/Icon"
import { usePopup } from "./hooks/usePopup"
import React from "react"
vhCheck()

const Spin = styled(Icon)`
animation: spin 1s linear infinite;
@keyframes spin{
  from{ transform: rotate(0deg)}
  to { transform: rotate(360deg) }
}
`
//zustant 全局状态管理
//上下文 show，hide所有组件都可以调用
export const LoadingContext = React.createContext({
    show: () => { },
    hide: () => { }
})

export const App: React.FC = () => {
    const { show, hide, popup } = usePopup(false, <div p-16px>
        <Spin className='w-32px h-32px' name='loading' /></div>, 'center')
    return (
        <div>
            <LoadingContext.Provider value={{ show, hide }}>
                <RouterProvider router={router} />
                {popup}
            </LoadingContext.Provider>
        </div>
    )
}