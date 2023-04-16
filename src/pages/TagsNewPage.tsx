import { Gradient } from "../components/Gradient"
import { TopNav } from "../components/TopNav"
import { TagForm } from "../components/TagsNewPage/TagForm"
import { BackIcon } from "../components/BackIcon"

export const
      TagsNewPage: React.FC = () => {

            return (
                  < div >
                        <Gradient className='grow-0 shrink-0'>
                              <TopNav title='新建标签' icon={<BackIcon />} />
                        </Gradient>
                        <TagForm type='create' />
                  </ div >

            )
      }