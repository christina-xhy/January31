import { Input } from "../../components/Input/Input"
import { useEffect, FormEventHandler } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { validate, hasError, FormError } from "../../lib/validate"
import { useCreateTagStore } from "../../stores/useCreateTagStore"
import { useAjax } from "../../lib/ajax"
import { Axios, AxiosError } from "axios"

type Props = {
    type: 'create' | 'edit'
}
//标签页面的TagsEditPage/TagsNewPage做类型校验 -- 在发送ajax post请求，并对结果做处理
export const TagForm: React.FC<Props> = (props) => {
    const { data, error, setData, setError } = useCreateTagStore()
    const { type } = props
    const [searchParams] = useSearchParams()
    const kind = searchParams.get('kind') ?? ''

    useEffect(() => {
        if (type !== 'create') { return }
        if (!kind) { throw new Error('kind is required') }
        if (kind !== 'expenses' && kind !== 'income') {
            throw new Error('kind must be expenses or income')
        }
        setData({ kind })
    }, [searchParams])
    const { post } = useAjax({ showLoading: true, handleError: true })
    const params = useParams()
    useEffect(() => {
        if (type !== 'edit') { return }
        const id = params.id
        if (!id) {
            throw new Error('id is required')
        }
    }, [])
    const onSubmitError = (error: AxiosError<{ errors: FormError<typeof data> }>) => {
        if (error.response) {
            const { status } = error.response
            console.log(error.response)
            if (status === 422) {
                const { errors } = error.response.data
                setError(errors)
            }
        }
        throw error
    }
    const nav = useNavigate()
    const onSubmit: FormEventHandler = async (e) => {
        e.preventDefault()
        const newError = validate(data, [
            { key: 'kind', type: 'required', message: '标签类型必填' },
            { key: 'name', type: 'required', message: '标签名必填' },
            { key: 'name', type: 'length', max: 4, message: '标签最多四个字符' },
            { key: 'sign', type: 'required', message: '符号必填' },
        ])
        setError(newError)
        if (!hasError(newError)) {
            const response = await post<Resource<Tag>>('/api/v1/tags', data).catch(onSubmitError)
            setData(response.data.resource)
            nav(`/items/new?kind=${encodeURIComponent(kind)}`)
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit} p-16px flex flex-col gap-y-8px>
                <Input type='text' label="标签名" error={error.name?.[0]} value={data.name} onChange={name => setData({ name })} />
                <Input type='emoji' label={<span h-26px >图标<span text-24px h-26px>{data.sign}</span></span>}
                    value={data.sign} onChange={sign => setData({ sign })} error={error.sign?.[0]} />
                <p text-center py-24px p-t-8px>记账时长按标签，即可编辑</p>
                <div>
                    <button j-btn>确认</button>
                </div>
            </form >
        </div>
    )
}
