import page from '../assets/images/welcome2.svg'
export const Welcome2: React.FC = () => {
  return (
    <div>
      <img src = {page}/>
      <h2 text-center>
        省时间<br/>
        记录收支一目了然
      </h2>
    </div>
  )
}