import { Navigate, Outlet } from 'react-router-dom'
export const Root: React.FC = () => {
  const hasRead = localStorage.getItem('hasReadWelcomes')
 if(hasRead === 'yes'){
  return <Navigate to = '/home'/>
 }else{
  return <div><Outlet /></div>
 }
}
