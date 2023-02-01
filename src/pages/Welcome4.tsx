import page from '../assets/images/welcome4.svg'
export const Welcome4: React.FC = () => {
  return (
    <div text-center>
      <img src = {page} w-128px h-150px/>
      <h2 text-center>
        云备份<br/>
        再也不怕数据丢失
      </h2>
    </div>
  )
}
