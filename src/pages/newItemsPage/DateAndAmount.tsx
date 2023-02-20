import { useState } from 'react'
interface Props {
  className: string
}
export const DateAndAmount: React.FC<Props> = (props) => {
  const { className } = props
  const [x, setX] = useState('')
  return (
   <div>
     <input className={className} value={x} onChange={e => setX(e.target.value)}/>
      Date <br/>
      Date <br/>
      Date <br/>
      Date <br/>
      Date <br/>
      Date <br/>
      Date <br/>
   </div>
  )
}
