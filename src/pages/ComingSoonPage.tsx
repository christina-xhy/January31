import { Icon } from "../components/Icon"
import logo from '../assets/images/logo.svg'
import { Button } from "antd-mobile"
import { Link, useNavigate } from "react-router-dom"

export const ComingSoonPage: React.FC = () => {
  const nav = useNavigate()
  return (
    <div flex justify-center items-center flex-col gap-y-24px p-48px h-screen px-48px>
      <Icon name='logo' className="w-128px h-128px" />
      <h1>敬请期待</h1>
      <button j-btn onClick={() => nav(-1)} >返回</button>

    </div>
  )
}