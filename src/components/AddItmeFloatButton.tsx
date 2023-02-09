import add from '../assets/images/add.svg'

export const AddItemFloatButton : React.FC = () => {
  return (
    <button w-56px h-56px bg="#5C33BE"  text-white rounded-50px 
        text-6xl  fixed bottom-16px right-16px>
        <img src={add} max-w = "100%" max-h="100%" />
      </button>
  )
}