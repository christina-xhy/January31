import { useState } from "react"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Input } from "../components/Input/Input"
import { TopNav } from "../components/TopNav"

type Props = {
      value: string
      onChange?: (value: string) => void
}
export const
      TagsNewPage: React.FC<Props> = (props) => {
            const { value, onChange } = props
            const onSubmit = () => { }
            const [emoji, setEmoji] = useState('')
            return (
                  < div >
                        <Gradient className='grow-0 shrink-0'>
                              <TopNav title='新建标签' icon={<Icon name='back' />} />
                        </Gradient>
                        <form onSubmit={onSubmit} px-16px py-32px flex flex-col gap-y-32px>
                              <Input label="标签名" error="标签名太长" />
                              <Input type='emoji' label={<span>图标<span text-24px>{emoji}</span></span>} value={emoji} onChange={(item) => setEmoji(item)} />
                              <p text-center py-24px>记账时长按标签，即可编辑</p>
                              <div>
                                    <button j-btn>comfirm</button>
                              </div>
                        </form >
                  </ div >

            )
      }