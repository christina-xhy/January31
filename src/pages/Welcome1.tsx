import page from '../assets/images/welcome1.svg'
export const Welcome1: React.FC = () => {
  return (
    <div text-center>
      <img src = {page} w-128px h-150px/>
      <h2 text-center>
        会挣钱<br/>
        还要会省钱
      </h2>
    </div>
  )
}
