import { Link } from 'react-router-dom'

interface Props {
  className?: string
}
export const CurrentUser: React.FC<Props> = ({ className }) => {
  return (
    <Link to='/sign_in' block className = {className} bg='#fda4af' text-white w='100%' pt-32px pb-44px>
        <h2 text-24px>未登录用户</h2>
        <div text='#CEA1FF'>点击这里登录</div>
    </Link>
  )
}
// block link曾经是内联元素，html的div 是块级元素，内联元素无法包裹块级元素。现在没有区分，保险起见加个block
