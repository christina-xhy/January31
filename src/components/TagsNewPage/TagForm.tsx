import { Input } from "../../components/Input/Input"
import { useEffect, FormEventHandler } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { validate, hasError } from "../../lib/validate"
import { useCreateTagStore } from "../../stores/useCreateTagStore"

type Props = {
    type: 'create' | 'edit'
}
//标签页面的TagsEditPage/TagsNewPage做类型校验 -- 在发送ajax post请求，并对结果做处理
export const TagForm: React.FC<Props> = (props) => {
    const { data, error, setData, setError } = useCreateTagStore()
    const { type } = props
    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (type !== 'create') { return }
        const kind = searchParams.get('kind')
        if (!kind) { throw new Error('kind is required') }
        if (kind !== 'expenses' && kind !== 'income') {
            throw new Error('kind must be expenses or income')
        }
        setData({ kind })
    }, [searchParams])
    
    const params = useParams()
    useEffect(() => {
        if (type !== 'edit') { return }
        const id = params.id
        if (!id) {
            throw new Error('id is required')
        }
        //发送ajax请求
    }, [])

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        const newError = validate(data, [
            { key: 'kind', type: 'required', message: '标签类型必填' },
            { key: 'name', type: 'required', message: '标签名必填' },
            { key: 'name', type: 'length', max: 4, message: '标签最多四个字符' },
            { key: 'sign', type: 'required', message: '符号必填' },
        ])
        setError(newError)
        if (!hasError(newError)) {
            //发送AJAX请求
            console.log('no error')
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit} p-16px flex flex-col gap-y-8px>
                <Input type='text' label="标签名" error={error.name?.[0]} value={data.name} onChange={name => setData({ name })} />
                <Input type='emoji' label={<span>图标<span text-24px>{data.sign}</span></span>}
                    value={data.sign} onChange={sign => setData({ sign })} error={error.sign?.[0]} />
                <p text-center py-24px p-t-8px>记账时长按标签，即可编辑</p>
                <div>
                    <button j-btn>确认</button>
                </div>
            </form >
        </div>
    )
}