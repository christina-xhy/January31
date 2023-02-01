import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useRef, useState} from 'react'
import { Link, useLocation, useOutlet } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
const linkMap:Record<string,string> = {
  '/welcome/1':'/welcome/2',
  '/welcome/2':'/welcome/3',
  '/welcome/3':'/welcome/4',
  '/welcome/4':'/welcome/xxx'
}

export const WelcomeLayout: React.FC = () => {
  const location = useLocation()
  const outlet = useOutlet()
  const [extraStyle, setExtraStyle] = useState<{position:'relative' | 'absolute'}>({position:'relative'})
  const map = useRef<Record<string, ReactNode>>({})
  map.current[location.pathname] = outlet
  const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 300 },
    onStart: () => {
      setExtraStyle({position:'absolute'})
    },
    onRest: () =>{
      setExtraStyle({position:'relative'})
    }
  })
  return (
    <div className='bg-#fda4af' h-screen flex flex-col items-stretch pb-16px>
      <header shrink-0 text-center pt-1px >
        <img w-150px h-100px src={logo} />
        <h1 text="indigo" text-26px>ali记账</h1>
      </header>
     <main shrink-1 grow-1 mx-16px relative >
      {transitions((style, pathname) =>
        <animated.div key={pathname} style={{...style,...extraStyle}}  w='100%' h='100%' flex >
          <div grow-1 bg-white flex justify-center items-center rounded-20px >
            {map.current[pathname]}
          </div>
        </animated.div>
      )}
     </main>
      <footer shrink-0 text-center grid grid-cols-3 grid-rows-1>
        <Link style={{gridArea:'1/2/2/3'}} to={linkMap[location.pathname]}>下一页</Link>
        <Link style={{gridArea:'1/3/2/4'}}to='/welcome/xxx'>跳转</Link>
      </footer>
    </div>
  )
}

