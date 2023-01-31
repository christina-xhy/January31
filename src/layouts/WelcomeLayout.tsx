import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Link, useLocation, useOutlet } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
const linkMap = {
  '/welcome/1':'/welcome/2',
  '/welcome/2':'/welcome/3',
  '/welcome/3':'/welcome/4',
  '/welcome/4':'/welcome/xxx'
}

export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  map.current[location.pathname] = outlet
  const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 300 }
  })
  return (
    <div className='bg-#fda4af' h-screen flex flex-col
      items-stretch pb-16px
    >
      <header shrink-0 text-center>
        <img w-150px src={logo} />
        <h1 text="indigo" text-30px>ali记账</h1>
      </header>
     <main shrink-0 grow-1  mx-16px >
      {transitions((style, pathname) =>
        <animated.div key={pathname} style={style} bg-white w='100%' h='100%'
        rounded-20px flex justify-center items-center>
          {map.current[pathname]}
        </animated.div>
      )}
     </main>
      <footer shrink-0 text-center text-white grid grid-cols-3 grid-rows-1>
        <Link style={{gridArea:'1/2/2/3'}} to='/welcome/2'>下一页</Link>
        <Link style={{gridArea:'1/3/2/4'}}to='/welcome/xxx'>跳转</Link>
      </footer>
    </div>
  )
}

