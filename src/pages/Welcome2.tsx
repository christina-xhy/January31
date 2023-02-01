import page from '../assets/images/welcome2.svg'
export const Welcome2: React.FC = () => {
  return (
    <div text-center>
      <img src = {page} w-128px h-150px/>
      <h2 text-center>
        省时间<br/>
        记录收支一目了然
      </h2>
    </div>
  )
}