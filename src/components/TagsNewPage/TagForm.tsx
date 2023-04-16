import { Input } from "../../components/Input/Input"
import { useEffect, FormEventHandler } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { validate, hasError, FormError } from "../../lib/validate"
import { useCreateTagStore } from "../../stores/useCreateTagStore"
import { useAjax } from "../../lib/ajax"
import { AxiosError } from "axios"
import useSWR from 'swr'

type Props = {
    type: 'create' | 'edit'
}
//标签页面的TagsEditPage/TagsNewPage做类型校验 -- 在发送ajax post请求，并对结果做处理
export const TagForm: React.FC<Props> = (props) => {
    const { data, error, setData, setError } = useCreateTagStore()
    const { type } = props
    const [searchParams] = useSearchParams()
    const { post, get, patch } = useAjax({ showLoading: false, handleError: true })

    //新建标签页面，获取到地址栏的kind并传入data，重写地址栏
    const kind = searchParams.get('kind') ?? ''
    useEffect(() => {
        if (type !== 'create') { return }
        if (!kind) { throw new Error('kind is required') }
        if (kind !== 'expenses' && kind !== 'income') {
            throw new Error('kind must be expenses or income')
        }
        setData({ kind })
    }, [searchParams])


    //查看标签页， 获取地址栏的id，进入编辑页面，重写地址栏
    const params = useParams()
    const id = params.id
    const { data: tag } = useSWR(id ? `/api/v1/tags/${id}` : null, async (path) =>
        (await get<Resource<Tag>>(path)).data.resource
    )
    useEffect(() => {
        if (type !== 'edit') { return }
        if (!id) {
            throw new Error('id is required')
        }
        if (tag) {
            setData(tag)
        }
    }, [tag])

    //统一发送请求，统一处理错误
    const onSubmitError = (error: AxiosError<{ errors: FormError<typeof data> }>) => {
        if (error.response) {
            const { status } = error.response
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
        // 收集新建标签的数据，post到服务器，并且上传kind路径
        if (!hasError(newError)) {
            const promise = type === 'create'
                ? post<Resource<Tag>>('/api/v1/tags', data)
                : patch<Resource<Tag>>(`/api/v1/tags/${id}`, data)
            const response = await promise.catch(onSubmitError)
            setData(response.data.resource)
            setData({ name: "", sign: "" })
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
