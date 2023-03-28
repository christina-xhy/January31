import { useState } from "react"
import { emojis } from "../../lib/emojis"
import s from './emojiInput.module.scss'
import sc from '../../pages/TagsNewPage.module.scss'
type Props = {
    value?: string
    onChange?: (value: string) => void
}

export const EmojiInput: React.FC<Props> = (props) => {
    const { value, onChange } = props
    const [emojiKind, setEmojiKind] = useState('表情')
    return (
        <div>
            <div flex flex-col gap-y-8px >
                <div className={s.wrapper} b-1 b='#f8b9c0' rounded-8px>
                    <div flex p-8px gap-x-16px overflow-auto text='#999'>
                        {
                            emojis.map((emoji) => {
                                return <span whitespace-nowrap key={emoji.name}
                                    className={emoji.name === emojiKind ? sc.selectedTag : ''}
                                    onClick={() => { setEmojiKind(emoji.name) }}>{emoji.name}</span>
                            })
                        }
                    </div>
                    <div text-24px p-t-8px p-b-16px h-300px overflow-auto>
                        {
                            emojis.map(emoji =>
                                <div style={{ display: emoji.name === emojiKind ? '' : 'none' }} key={emoji.name} grid
                                    grid-cols='[repeat(auto-fit,36px)]' grid-rows='[repeat(auto-fit,36px)]'
                                    justify-center>
                                    {emoji.chars.map(char =>
                                        <span key={char} rounded-4px b-1 b-transparent text-center className={char === value ? s.selected : ''}
                                            onClick={() => value !== char && onChange?.(char)}> {char} </span>)}
                                </div>)
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}