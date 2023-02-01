import page from '../assets/images/welcome3.svg'
export const Welcome3: React.FC = () => {
  return (
    <div text-center>
      <img src = {page} w-128px h-150px/>
      <h2 text-center>
        数据可视化<br/>
        收支一目了然
      </h2>
    </div>
  )
}
