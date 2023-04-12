import { Link } from 'react-router-dom'
import useSwr from 'swr'
import { Icon } from '../../components/Icon'
import { useAjax } from '../../lib/ajax'
import { useTagsStore } from '../../stores/useTagsStore'

interface Props {
  kind: Item['kind']
  value?: Item['tag_ids']
  onChange?: (ids: Item['tag_ids']) => void
}
export const Tags: React.FC<Props> = (props) => {
  const { kind } = props
  const { list, setList } = useTagsStore()
  const { get } = useAjax({ showLoading: true, handleError: true })
  useSwr('/api/v1/tags', async (path) => {
    const response = await get<Resources<Tag>>(path)
    setList(response.data.resources)
  })
  return (
    <div>
      <ol grid grid-cols='[repeat(auto-fit,48px)]' justify-center gap-x-32px gap-y-16px
        py-16px px-8px >
        <li>
          {/* 新增表情 */}
          <Link to={`/tags/new?kind=${kind}`}>
            <span block w-48px h-48px rounded='24px' bg='EFEFEF' flex justify-center items-center
              text-24px b-1 b='#fda4af' text='#fda4af'>
              <Icon name='add' />
            </span>
          </Link>
        </li>
        {list.map(tag =>
          <li key={tag.id} w-48px flex justify-center items-center flex-col onClick={() => { props.onChange?.([tag.id]) }}>
            {
              props.value?.includes(tag.id)
                ? <span block w-48px h-48px rounded='24px' bg='#EFEFEF' flex justify-center items-center
                  text-24px b-1 b='#fbaebe' >{tag.sign}</span>
                : <span block w-48px h-48px rounded='24px' bg='#EFEFEF' flex justify-center items-center
                  text-24px b-1 b-transparent >{tag.sign}</span>
            }
            <span text-12px text='#666'>{tag.name}</span>
          </li>
        )}
      </ol>
    </div>
  )
}
