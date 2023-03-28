import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { TopNav } from "../components/TopNav"
import { TagForm } from "../components/TagsNewPage/TagForm"

export const
      TagsNewPage: React.FC = () => {

            return (
                  < div >
                        <Gradient className='grow-0 shrink-0'>
                              <TopNav title='新建标签' icon={<Icon name='back' />} />
                        </Gradient>
                        <TagForm type='create' />
                  </ div >

            )
      }