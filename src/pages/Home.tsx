import { useLocalStore } from "../stores/useLocalStore";
import pig from '../assets/images/pig.svg'
import add from '../assets/images/add.svg'

export const Home : React.FC = () => {
  return <div>
    <div flex justify-center items-center>
      <img mt-20vh mb-20vh width= '98' height= '100' src={pig}/>
    </div>
    <div px-16px>
      <button h-48px w='100%' bg='#5C33BE' text-white b-none
      rounded-8px
      >开始记账</button>
    </div>
    <button w-56px h-56px bg="#5C33BE"  text-white rounded-50px 
      text-6xl  fixed bottom-16px right-16px>
      <img src={add} max-w = "100%" max-h="100%" />
    </button>
  </div>
}