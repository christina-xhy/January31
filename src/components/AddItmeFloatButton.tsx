import add from '../assets/icons/add.svg'

export const AddItemFloatButton : React.FC = () => {
  return (
    <button w-56px h-56px bg="#5C33BE"  text-white rounded-50px 
        text-6xl  fixed bottom-16px right-16px>
      <svg style={{width:'1.2em',height:'1.2em'}}>
        <use xlinkHref='#add'></use>
      </svg>
    </button>
  )
}