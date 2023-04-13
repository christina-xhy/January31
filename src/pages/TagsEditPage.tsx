import { useNavigate, useParams } from "react-router-dom"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { TagForm } from "../components/TagsNewPage/TagForm"
import { TopNav } from "../components/TopNav"
import { useAjax } from "../lib/ajax"

export const TagsEditPage: React.FC = () => {
    const comfirmable = (fn: () => void) => () => {
        const result = window.confirm('确定要删除吗')
        if (result) { fn() }
    }
    const nav = useNavigate()
    const { id } = useParams()
    const { destroy } = useAjax({ showLoading: true, handleError: true })
    const onDelete = comfirmable(async () => {
        if (!id) { throw new Error('id不能为空') }
        await destroy(`/api/v1/tags/${id}`).catch((error) => { window.alert('删除失败'); throw error })
        window.alert('删除成功')
        nav('/items/new')
    })

    return (
        <div>

            <Gradient className='grow-0 shrink-0'>
                <TopNav title='查看标签' icon={<Icon name='back' />} />
            </Gradient>
            <TagForm type='edit' />
            <div px-16px p-b-32px>
                <button j-btn bg-red onClick={onDelete}>删除</button>
            </div>

        </div>
    )
}