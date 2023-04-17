import { Icon } from "../components/Icon"
import logo from '../assets/images/logo.svg'
import { useNavigate } from "react-router-dom"

export const ComingSoonPage: React.FC = () => {
  const nav = useNavigate()
  return (
    <div flex justify-center items-center flex-col gap-y-24px h-screen px-48px>
      {/* <Icon name='logo' className="w-256px h-256px" /> */}
      <img src={logo} />
      <h1>敬请期待</h1>
      <button j-btn onClick={() => nav(-1)} >返回</button>

    </div>
  )
}