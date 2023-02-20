import { Icon } from './Icon'

export const AddItemFloatButton: React.FC = () => {
  return (
    <button border-none w-56px h-56px bg="#fda4af" text-white rounded-50px
        text-6xl fixed bottom-16px right-16px flex justify-center items-center>
      <Icon name='add' className='w-48px h-48px'/>
    </button>
  )
}
