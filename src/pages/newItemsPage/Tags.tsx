import { Icon } from '../../components/Icon'

interface Props {
  kind: Item['kind']
}
export const Tags: React.FC<Props> = (props) => {
  const tags = Array.from({ length: 90 })
  return (
    <div>
      <ol grid grid-cols='[repeat(auto-fit,48px)]' justify-center gap-x-32px gap-y-16px
      py-16px px-8px>
        <li>
            <span block w-48px h-48px rounded='24px' bg='EFEFEF' flex justify-center items-center
            text-24px b-1 b='#fda4af' text='#fda4af'>
                <Icon name='add'/>
            </span>
        </li>
      { tags.map(tag =>
      <li w-48px flex justify-center items-center flex-col>
        <span block w-48px h-48px rounded='24px' bg='EFEFEF' flex justify-center items-center
            text-24px b-1 b='#fda4af' >🥰</span>
        <span text-12px text='#666'>打车</span>
      </li>
      )}
      </ol>
    </div>
  )
}
